const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");
async function getinterview(inter_id) {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = `select *
    from interview
    where (EMP_ID1 = :EMP_ID or  EMP_ID2 = :EMP_ID or EMP_ID3 = :EMP_ID)`;

    const options = {
      autoCommit: true,
      bindDefs: {
        EMP_ID: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(query, inter_id, options);

    //json file
    const data = result.rows.map((row) => {
      var data = {};
      for (let i = 0; i < result.metaData.length; i++) {
        data[result.metaData[i].name] = row[i];
      }
      return data;
    });
    console.log(data);
    await connection.close();
    return data;
  } catch (error) {
    throw error;
  }
}

// ------------------------------------ทดสอบรันโค้ด
// getinterview(inter_id)
//   .then((result) => {
//     console.log("Data successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error  data:", error);
//   });
module.exports = { getinterview };
