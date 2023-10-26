const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function creatINTERcon(newINTERcon_Data) {
  try {
    const connection = await connectToDatabase();
    const sql = `
   
  `;

    const options = {
      autoCommit: true,
      bindDefs: {
        ID: { type: oracledb.STRING },
        INTER_ID: { type: oracledb.STRING },
        DATE_SELECTED: { type: oracledb.STRING },
        RANGE_TIME_SELECTED: { type: oracledb.DATE },
      },
    };
    const result = await connection.execute(sql, newINTERcon_Data, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

const newINTERcon_Data = {
  ID: "5",
  INTER_ID: "inter001",
  DATE_SELECTED: null,
  RANGE_TIME_SELECTED: "1",
};

creatINTERcon(newINTERcon_Data)
  .then((result) => {
    console.log("Data inserted successfully:", result);
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });

module.exports = { creatINTERcon };
