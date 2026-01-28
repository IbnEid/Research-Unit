require("dotenv").config();
const express = require("express");
const { poolPromise, sql } = require("./db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Create, Method POST
app.post("/", async (req, res) => {
  const { Case_Head_Name, Case_Head_SSN, Case_District, Rsh_Manager_Evaluation, Rsh_Accepted_Support, Rsh_Employee_Evaluation, Rsh_Latest_Date, Emp_ID } = req.body;

  const pool = await poolPromise;
  await pool.request()
    .input("Case_Head_Name", sql.VarChar, Case_Head_Name)
    .input("Case_Head_SSN", sql.NVarChar, Case_Head_SSN)
    .input("Case_District", sql.NVarChar, Case_District)
    .input("Rsh_Manager_Evaluation", sql.NVarChar, Rsh_Manager_Evaluation)
    .input("Rsh_Accepted_Support", sql.NVarChar, Rsh_Accepted_Support)
    .input("Rsh_Employee_Evaluation", sql.NVarChar, Rsh_Employee_Evaluation)
    .input("Rsh_Latest_Date", sql.NVarChar, Rsh_Latest_Date)
    .input("Emp_ID", sql.Int, Emp_ID)
    .query(`
      INSERT INTO Case_Table (Emp_id, Case_district, Case_head_name,Case_head_ssn ,Rsh_manager_evaluation ,Rsh_accepted_support ,Rsh_employee_evaluation ,Rsh_latest_date )
      VALUES (@Emp_ID, @Case_District,@Case_Head_Name, @Case_Head_SSN, @Rsh_Manager_Evaluation ,@Rsh_Accepted_Support ,@Rsh_Employee_Evaluation ,@Rsh_Latest_Date)
    `);

  res.json({ message: "Created Done" });
});

// READ, METHOD POST
app.post("/read", async (req, res) => {
  const { ssn } = req.body;

  const pool = await poolPromise;
  const result = await pool.request()
    .input("ssn", sql.VarChar, ssn)
    .query(`
      SELECT * FROM Case_Table
      WHERE Case_head_ssn = @ssn
    `);

  res.json(result.recordset[0] || null);
});

// UPDATE, METHOD PUT
app.put("/", async (req, res) => {
  const { getCase_Head_Name, getCase_Head_SSN, getCase_District, getMgn_eval, getAcceptedSup, getEmp_eval, getLstDate, getEmployee_ID } = req.body;


  const pool = await poolPromise;
  await pool.request()
    .input("getCase_Head_Name", sql.VarChar, getCase_Head_Name)
    .input("getCase_Head_SSN", sql.NVarChar, getCase_Head_SSN)
    .input("getCase_District", sql.NVarChar, getCase_District)
    .input("getMgn_eval", sql.NVarChar, getMgn_eval)
    .input("getAcceptedSup", sql.NVarChar, getAcceptedSup)
    .input("getEmp_eval", sql.NVarChar, getEmp_eval)
    .input("getLstDate", sql.NVarChar, getLstDate)
    .input("getEmployee_ID", sql.Int, getEmployee_ID)
    .query(`
      UPDATE Case_Table
      SET Emp_id = @getEmployee_ID, Case_district = @getCase_District, Case_head_name= @getCase_Head_Name, Case_head_ssn =@getCase_Head_SSN,Rsh_manager_evaluation =@getMgn_eval,Rsh_accepted_support =@getAcceptedSup ,Rsh_employee_evaluation =@getEmp_eval ,Rsh_latest_date = @getLstDate
      WHERE Case_head_ssn = @getCase_Head_SSN
    `);

  res.json({ message: "Updated Done" });
});

// DELETE, METHOD DELETE
app.delete("/", async (req, res) => {
  const { ssn } = req.body;

  const pool = await poolPromise;
  await pool.request()
    .input("ssn", sql.VarChar, ssn)
    .query(`
      DELETE FROM Case_Table
      WHERE Case_head_ssn = @ssn
    `);

  res.json({ message: "Deleted" });
});
