const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

const insert_dept_data = {
  DEPT_ID: "d09",
  DEPT_NAME: "แม่บ้าน",
};
async function insert_dept(insert_dept_data) {
  try {
    const connection = await connectToDatabase();
    const sql = ` INSERT INTO department (DEPT_ID,DEPT_NAME)
    VALUES (:DEPT_ID, :DEPT_NAME)`;

    const options = {
      autoCommit: true,
      bindDefs: {
        DEPT_ID: { type: oracledb.STRING },
        DEPT_NAME: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, insert_dept_data, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

insert_dept(insert_dept_data)
  .then((result) => {
    console.log("Data insert successfully:", result);
  })
  .catch((error) => {
    console.error("Error insert data:", error);
  });

module.exports = { insert_dept };