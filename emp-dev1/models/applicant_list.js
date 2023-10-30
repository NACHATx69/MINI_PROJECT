const { connectToDatabase } = require("../config/db");

async function applicant_list() {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
    SELECT * FROM APPLICANT
    `;
    const result = await connection.execute(query);

    //json file
    const data = result.rows.map((row) => {
      var data = {};
      for (let i = 0; i < result.metaData.length; i++) {
        data[result.metaData[i].name] = row[i];
      }
      return data;
      
      
    });

    await connection.close();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

applicant_list()

module.exports = { applicant_list };
