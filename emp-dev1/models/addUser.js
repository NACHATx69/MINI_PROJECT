
const { connectToDatabase } = require("../config/db");
const oracledb = require('oracledb');


async function creatUser(employeeData) {
  try {
    const connection = await connectToDatabase();
    // ทำตามคำสั่ง SQL ที่ต้องการ
    const sql = `
    INSERT INTO employee (EMP_ID, FNAME, LNAME, DEPARTMENT, POSITIONS, PERMISTION, MGR_ID,STATUS, USERNAME, PASS, HIREDATE, EXITDATE)
    VALUES (:EMP_ID, :FNAME, :LNAME, :DEPARTMENT, :POSITIONS, :PERMISTION, :MGR_ID,'0', :USERNAME, :PASS, :HIREDATE, null)
  `;

  
  const options = {
    autoCommit: true, // ให้บันทึกอัตโนมัติ
    bindDefs: {
      EMP_ID: { type: oracledb.STRING },
      FNAME: { type: oracledb.STRING },
      LNAME: { type: oracledb.STRING },
      DEPARTMENT: { type: oracledb.STRING },
      POSITIONS: { type: oracledb.STRING },
      PERMISTION: { type: oracledb.STRING },
      MGR_ID: { type: oracledb.STRING },
      USERNAME: { type: oracledb.STRING },
      PASS: { type: oracledb.STRING },
      HIREDATE: { type: oracledb.DATE },
    }
  };
  const result = await connection.execute(sql, employeeData, options);
  return result;
  await connection.close();
} catch (error) {
  throw error;
}
};


//------------------------------------ชุดข้อมูลสำหรับทดสอบ
const newEmployeeData = {
    EMP_ID: 'e023',
    FNAME: 'John',
    LNAME: 'Doe',
    DEPARTMENT: 'd05',
    POSITIONS: 'p01',
    PERMISTION: 'per001',
    MGR_ID: 'e003',
    USERNAME: 'johndoe',
    PASS: 'password123',
    HIREDATE: null,
  };
//------------------------------------ทดสอบรันโค้ด
  // creatUser(newEmployeeData)
  // .then(result => {
  //   console.log('Data inserted successfully:', result);
  // })
  // .catch(error => {
  //   console.error('Error inserting data:', error);
  // });

module.exports = { creatUser };
