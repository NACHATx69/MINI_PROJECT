const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function addREQ_LIST_POST(newrecdata) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    INSERT INTO REQ_LIST_POS (
        RLP_ID,
        POSITION,
        REQ_LIST_ID,
        DEPT_ID
    )
    VALUES (:RLP_ID, :POSITION, :REQ_LIST_ID, :DEPT_ID)
  `;

    const options = {
      autoCommit: true,
      bindDefs: {
        RLP_ID: { type: oracledb.STRING },
        POSITION: { type: oracledb.STRING },
        REQ_LIST_ID: { type: oracledb.DATE },
        DEPT_ID: { type: oracledb.DATE },
      }
    };
    const result = await connection.execute(sql, newrecdata, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

const newInterdata = {
  RLP_ID: "RLP25661028002",
  POSITION: "p04",
  REQ_LIST_ID: "C25661026011",
  DEPT_ID: "d03"
};

// addREQ_LIST_POST(newInterdata)
//   .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });

module.exports = { addREQ_LIST_POST };
