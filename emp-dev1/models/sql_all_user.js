const { connectToDatabase } = require('../config/db');

async function getUserData() {
    try {
      const connection = await connectToDatabase();
      // ทำตามคำสั่ง SQL ที่ต้องการ
      const query = 'SELECT * FROM emp';
      const result = await connection.execute(query);

      const data = result.rows.map(row => {
        const data = {};
        for (let i = 0; i < result.metaData.length; i++) {
          data[result.metaData[i].name] = row[i];
        }
        return data;
      });

      await connection.close();
      return data;
    } catch (error) {
      throw error;
    }
  }


  module.exports = { getUserData };