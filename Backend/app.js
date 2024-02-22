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
  host: 'b9yaynatxbsydsvgvz9x-mysql.services.clever-cloud.com',
  user: 'uqyvrwhbv6fsmggi',
  password: 'ex1KVVyMNR6Urx37iq6p',
  database: 'b9yaynatxbsydsvgvz9x'
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

app.put('/employees/:id', (req, res) => {
  const { name, employeeId, department, dob, gender, designation, salary } = req.body;
  const id = req.params.id;
  
  // Construct SQL query to update employee details
  const query = `UPDATE employees SET name = ?, employeeId = ?, department = ?, dob = ?, gender = ?, designation = ?, salary = ? WHERE id = ?`;
  
  // Execute the query
  db.query(query, [name, employeeId, department, dob, gender, designation, salary, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    } else {
      res.status(200).send('Employee updated successfully');
    }
  });
});


app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  // Construct SQL query to delete employee
  const query = `DELETE FROM employees WHERE id = ?`;

  // Execute the query
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).send('Error deleting employee');
    } else {
      res.status(200).send('Employee deleted successfully');
    }
  });
});

app.get('/employees', (req, res) => {
  // Construct SQL query to select all employees
  const query = `SELECT * FROM employees`;

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send('Error fetching employees');
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
