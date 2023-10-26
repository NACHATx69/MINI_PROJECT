const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");
async function getinterview_de(inter_id) {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const query = `select *
    from interview
    where INTER_ID = :INTER_ID`;

    const options = {
      autoCommit: true,
      bindDefs: {
        INTER_ID: { type: oracledb.STRING },
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
// const inter_status = ({
//   INTER_ID: "inter001",
// });

// getinterview(inter_status)
//   .then((result) => {
//     console.log("Data successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error  data:", error);
//   });

module.exports = { getinterview_de };
