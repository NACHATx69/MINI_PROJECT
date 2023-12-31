const { connectToDatabase } = require("../config/db");

async function study() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = "SELECT id,study from STUDY";
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
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

// study()

module.exports = { study };
