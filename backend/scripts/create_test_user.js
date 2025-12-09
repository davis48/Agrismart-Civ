const bcrypt = require('bcryptjs');
const db = require('./src/config/database');

async function createTestUser() {
    try {
        const password = 'password123';
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `
      INSERT INTO users (email, telephone, password_hash, nom, prenoms, role, status, langue_preferee)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (telephone) DO UPDATE 
      SET password_hash = $3, status = 'actif'
      RETURNING id, telephone, nom;
    `;

        const values = ['test@agrismart.ci', '0700000001', hashedPassword, 'Test', 'User', 'producteur', 'actif', 'fr'];

        const result = await db.query(query, values);
        console.log('User created:', result.rows[0]);
        process.exit(0);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    }
}

createTestUser();
