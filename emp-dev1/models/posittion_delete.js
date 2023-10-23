const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

const position = {
  POS_ID: "p07",
};

async function delete_position(position) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    DELETE FROM POSITION
    WHERE POS_ID=:POS_ID`;

    const options = {
      autoCommit: true,
      bindDefs: {
        POS_ID: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, position, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

delete_position(position)
  .then((result) => {
    console.log("Data Delete successfully:", result);
  })
  .catch((error) => {
    console.error("Error Deleting data:", error);
  });

module.exports = { delete_position };
