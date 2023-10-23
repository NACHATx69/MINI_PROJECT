const oracledb = require('oracledb');

async function connectToDatabase() {
  try {
    await oracledb.initOracleClient({ mode: 'OCI' });
    const connection = await oracledb.getConnection({
      user: 'inno082',
      password: 'P029E13',
      connectString: '203.188.54.7:1521/database'
    });
    return connection;
  } catch (error) {
    throw error;
  }
}

module.exports = { connectToDatabase };
