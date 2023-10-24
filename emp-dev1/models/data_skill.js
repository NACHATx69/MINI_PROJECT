const { connectToDatabase } = require("../config/db");

async function skill() {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = "SELECT skill_id as id ,skill_name as skill from SKILL";
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

// skill()

module.exports = { skill };
