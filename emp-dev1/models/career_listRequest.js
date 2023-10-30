const { connectToDatabase } = require("../config/db");

async function career_listRequest() {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
      SELECT  R.REQ_LIST_ID,
        R.DETAIL,
        R.SALARY,
        D.DEPT_NAME,
        D.DEPT_ID,
        P.POS_NAME,
        P.POS_ID,
        EMP.EMP_ID,
        EMP.FNAME, 
        EMP.LNAME,
        EMP.MGR_ID,
        MGR.FNAME AS MGRF,
        MGR.LNAME AS MGRL,
        S.REQ_STATUS AS STATUS
      from    REQ_LIST R  
      LEFT JOIN
        EMPLOYEE EMP ON R.REQ_BY = EMP.EMP_ID
      LEFT JOIN
        EMPLOYEE MGR ON EMP.MGR_ID = MGR.EMP_ID
      INNER JOIN
       DEPARTMENT D ON R.JOB = D.DEPT_ID
      INNER JOIN
        POSITION P ON R.JOB_POSITTION = P.POS_ID
      INNER JOIN 
        REQ_STATUS S ON R.STATUS = S.ID
    `;
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
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

career_listRequest()

module.exports = { career_listRequest };
