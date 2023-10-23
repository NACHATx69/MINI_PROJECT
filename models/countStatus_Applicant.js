const { connectToDatabase } = require("../config/db");

async function getStatusCounts() { // Corrected function name
  try {
    const connection = await connectToDatabase();
    
    const query = `
    SELECT S.STATUS_LIST, COUNT(A.APPL_ID) AS Applicant_Count
FROM APPLICANT A
INNER JOIN APPL_STATUS S ON A.APPL_STATUS = S.APPL_STATUS
GROUP BY S.STATUS_LIST;
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

getgetStatusCounts(); // Corrected function call
module.exports = { getStatusCounts }; // Corrected export
