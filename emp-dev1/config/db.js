const oracledb = require('oracledb');

const dbConfig = {
    user: 'inno082',
    password: 'P029E13',
    connectString: '203.188.54.7:1521/database'
};

async function connectDB() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connected to Oracle Database');
    } catch (error) {
        console.error('Error connecting to Oracle Database:', error);
    }
}

module.exports = connectDB;