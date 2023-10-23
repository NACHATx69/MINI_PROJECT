const { connectToDatabase } = require("../config/db");

async function getReqCounts() { // Corrected function name
  try {
    const connection = await connectToDatabase();
    
    const query = `
    SELECT
    d.DEPT_NAME,
    COUNT(rl.REQ_LIST_ID) AS request_list_count
FROM
    DEPARTMENT d
LEFT JOIN
    REQ_LIST_POS rlp ON d.DEPT_ID = rlp.DEPT_ID
LEFT JOIN
    REQ_LIST rl ON rlp.REQ_LIST_ID = rl.REQ_LIST_ID
GROUP BY
    d.DEPT_NAME;
;
    `;
    
    const result = await connection.execute(query);

    const data = result.rows.map((row) => {
      return {
        position_category: row[0], // Use position_category here
        request_count: row[1]
      };
    });
    
    console.log(data);
    await connection.close();
    return data;
  } catch (error) {
    throw error;
  }
}

getgetReqCounts(); // Corrected function call
module.exports = { getReqCounts }; // Corrected export
