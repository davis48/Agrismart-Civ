'use client';

import React from 'react';
import {
    Activity,
    Battery,
    Wifi,
    AlertTriangle,
    Clock,
    MapPin,
    RefreshCw,
    Database
} from 'lucide-react';

const SENSORS = [
    { id: 'SENS-001', type: 'SOL', location: 'Parcelle Nord', battery: 85, signal: 92, lastUpdate: '2 min', status: 'OK' },
    { id: 'SENS-002', type: 'METEO', location: 'Station Principale', battery: 98, signal: 100, lastUpdate: '1 min', status: 'OK' },
    { id: 'SENS-003', type: 'SOL', location: 'Parcelle Sud', battery: 12, signal: 45, lastUpdate: '45 min', status: 'WARNING' },
    { id: 'SENS-004', type: 'SOL', location: 'Parcelle Est', battery: 0, signal: 0, lastUpdate: '2 jours', status: 'OFFLINE' },
    { id: 'SENS-005', type: 'IRRIG', location: 'Serre 1', battery: 72, signal: 88, lastUpdate: '5 min', status: 'OK' },
];

export default function SensorsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Activity className="w-8 h-8 mr-3 text-blue-600" />
                        Supervision des Capteurs
                    </h1>
                    <p className="text-gray-500 mt-1">État de santé du réseau IoT, batteries et connectivité</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Actualiser
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                        <Database className="w-5 h-5 mr-2" />
                        Export Logs
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Capteurs Actifs"
                    value="4/5"
                    icon={Activity}
                    color="blue"
                    subtext="80% opérationnels"
                />
                <KPICard
                    title="Alertes Batterie"
                    value="1"
                    icon={Battery}
                    color="orange"
                    subtext="< 15% charge"
                />
                <KPICard
                    title="Hors Ligne"
                    value="1"
                    icon={Wifi}
                    color="red"
                    subtext="Perte signal > 24h"
                />
                <KPICard
                    title="Messages/Jour"
                    value="12.5k"
                    icon={Database}
                    color="green"
                    subtext="+2% vs hier"
                />
            </div>

            {/* Sensors Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID Capteur</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Type & Localisation</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">État Santé</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Connectivité</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Dernière MAJ</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {SENSORS.map((sensor) => (
                            <tr key={sensor.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-gray-600">
                                    {sensor.id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{sensor.type}</div>
                                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {sensor.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Battery className={`w-4 h-4 ${getBatteryColor(sensor.battery)}`} />
                                        <span className="text-sm font-medium">{sensor.battery}%</span>
                                        {sensor.battery < 20 && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Wifi className={`w-4 h-4 ${getSignalColor(sensor.signal)}`} />
                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getSignalBarColor(sensor.signal)}`}
                                                style={{ width: `${sensor.signal}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {sensor.lastUpdate}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(sensor.status)}`}>
                                        {sensor.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Helpers
function KPICard({ title, value, icon: Icon, color, subtext }: any) {
    const colorClasses: { [key: string]: string } = {
        blue: 'bg-blue-100 text-blue-600',
        orange: 'bg-orange-100 text-orange-600',
        red: 'bg-red-100 text-red-600',
        green: 'bg-green-100 text-green-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium uppercase">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <p className="text-gray-400 text-xs mt-3">{subtext}</p>
        </div>
    );
}

function getBatteryColor(level: number) {
    if (level < 20) return 'text-red-500';
    if (level < 50) return 'text-orange-500';
    return 'text-green-500';
}

function getSignalColor(level: number) {
    if (level === 0) return 'text-gray-300';
    if (level < 40) return 'text-red-500';
    if (level < 70) return 'text-orange-500';
    return 'text-green-500';
}

function getSignalBarColor(level: number) {
    if (level === 0) return 'bg-gray-300';
    if (level < 40) return 'bg-red-500';
    if (level < 70) return 'bg-orange-500';
    return 'bg-green-500';
}

function getStatusColor(status: string) {
    switch (status) {
        case 'OK': return 'bg-green-100 text-green-800';
        case 'WARNING': return 'bg-orange-100 text-orange-800';
        case 'OFFLINE': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}
