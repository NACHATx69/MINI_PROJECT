
const { connectToDatabase } = require("../config/db");
const oracledb = require('oracledb');


async function creatUser(empId) {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const sql = `
    SELECT fname, lname
    FROM EMPLOYEE
    WHERE (EMPLOYEE.EMP_ID= :EMP_ID)
  `
  const result = await connection.execute(sql,empId);
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
  
  return count;
} catch (error) {
  throw error;
}
};


//------------------------------------ชุดข้อมูลสำหรับทดสอบ
const newEmployeeData = {
    EMP_ID: 'e023',
  };
//------------------------------------ทดสอบรันโค้ด
  creatUser(newEmployeeData)
  .then(result => {
    console.log('Data inserted successfully:', result);
  })
  .catch(error => {
    console.error('Error inserting data:', error);
  });

module.exports = { creatUser };
