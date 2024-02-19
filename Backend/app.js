// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Saran@533',
  database: 'employee_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

app.post('/api/employees', (req, res) => {
  const { name, employeeId, department, dob, gender, designation, salary } = req.body;
  if (!name || !employeeId || !department || !dob || !gender || !designation || !salary) {
    return res.status(400).json({ message: 'Incomplete data' });
  }
  if (name.length > 30 || salary.length > 8) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  const sql =
    'INSERT INTO employees (name, employeeId, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [name, employeeId, department, dob, gender, designation, salary],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to add employee' });
      }
      res.status(201).json({ message: 'Employee added successfully' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
