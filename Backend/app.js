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
  host: 'bde4zoi3bbkeqcmansvo-mysql.services.clever-cloud.com',
  user: 'uota7nkpcyuxj8le',
  password: 'UZtkeO7inb06rx1OhzO1',
  database: 'bde4zoi3bbkeqcmansvo'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected');
});

// Handle database connection errors
db.on('error', (err) => {
  console.error('MySQL connection error:', err);
});

// Add a new employee
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
        console.error('Error adding employee:', err);
        return res.status(500).json({ message: 'Failed to add employee' });
      }
      res.status(201).json({ message: 'Employee added successfully' });
    }
  );
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
  const { name, employeeId, department, dob, gender, designation, salary } = req.body;
  const id = req.params.id;

  const query = `UPDATE employees SET name = ?, employeeId = ?, department = ?, dob = ?, gender = ?, designation = ?, salary = ? WHERE id = ?`;
  
  db.query(query, [name, employeeId, department, dob, gender, designation, salary, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Error updating employee' });
    } else {
      res.status(200).json({ message: 'Employee updated successfully' });
    }
  });
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM employees WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ message: 'Error deleting employee' });
    } else {
      res.status(200).json({ message: 'Employee deleted successfully' });
    }
  });
});

// Get all employees
app.get('/employees', (req, res) => {
  const query = `SELECT * FROM employees`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ message: 'Error fetching employees' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
