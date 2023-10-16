const { connectToDatabase } = require("../config/db");

async function login(id, pass) {
    try {
      const connection = await connectToDatabase();
      const query = "SELECT * FROM EMPLOYEE WHERE PASS = :pass AND EMP_ID = :id";
      const result = await connection.execute(query, { id, pass });
  
      const data = result.rows.map((row) => {
        var data = {};
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
  
  const id = '256610028';
  const pass = '1234';

module.exports = { login };
