require('dotenv').config();
const mqtt = require('mqtt');
const { Pool } = require('pg');

// Configuration Database
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'agrismart',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

// Configuration MQTT
const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://test.mosquitto.org';
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'agrismart/+/up';

console.log(`Connecting to MQTT Broker: ${MQTT_BROKER}`);
const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe(MQTT_TOPIC, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
        } else {
            console.error('Subscription error:', err);
        }
    });
});

client.on('message', async (topic, message) => {
    try {
        const payload = message.toString();
        console.log(`Received message on ${topic}: ${payload}`);

        // Extract device ID from topic (assuming format agrismart/{device_id}/up)
        const parts = topic.split('/');
        const deviceId = parts[1]; // Adjust based on actual topic structure

        // Decode Payload (Simulated for now)
        const data = decodePayload(payload);

        if (data) {
            await saveMeasurement(deviceId, data);
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

// Mock Decoder - Replace with real LoRaWAN decoder
function decodePayload(payload) {
    try {
        // Attempt to parse JSON first
        const json = JSON.parse(payload);
        return json;
    } catch (e) {
        // If not JSON, assume binary/hex string and decode manually
        // Example: "0119023C" -> Type 01 (Temp), Val 25 (0x19) | Type 02 (Hum), Val 60 (0x3C)
        // For this MVP, we'll assume the simulator sends JSON
        console.log('Payload is not JSON, skipping decoding for MVP');
        return null;
    }
}

async function saveMeasurement(deviceCode, data) {
    const client = await pool.connect();
    try {
        // data example: { temperature: 25.5, humidity: 60 }
        for (const [type, value] of Object.entries(data)) {
            // Map incoming type to database type enum if necessary
            // DB types: temperature, humidite_air, humidite_sol, luminosite, pluviometrie, ph_sol, niveau_eau
            let dbType = type;
            if (type === 'humidity') dbType = 'humidite_air';
            if (type === 'soil_moisture') dbType = 'humidite_sol';
            if (type === 'light') dbType = 'luminosite';
            if (type === 'rain') dbType = 'pluviometrie';

            // Find sensor by code (stored in 'reference' or 'code' column? Schema said 'reference' might be good, or we add a column)
            // Let's assume 'reference' column in 'capteurs' table holds the device ID/Code

            const sensorRes = await client.query(
                "SELECT id FROM capteurs WHERE code = $1 AND type = $2",
                [deviceCode, dbType]
            );

            if (sensorRes.rows.length > 0) {
                const dbSensorId = sensorRes.rows[0].id;

                await client.query(
                    "INSERT INTO mesures (capteur_id, valeur, mesure_at) VALUES ($1, $2, NOW())",
                    [dbSensorId, value]
                );

                // Update last measure
                await client.query(
                    "UPDATE capteurs SET derniere_mesure = NOW() WHERE id = $1",
                    [dbSensorId]
                );

                console.log(`[DB] Saved: Sensor ${dbSensorId} (${dbType}) = ${value}`);
            } else {
                console.warn(`[DB] Sensor not found for code: ${deviceCode}, type: ${dbType}`);
            }
        }
    } catch (err) {
        console.error('Database error:', err);
    } finally {
        client.release();
    }
}
