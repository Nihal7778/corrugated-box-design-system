import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    employee_code: '',
    employee_name: '',
    phone_no: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/employees/add', employeeData);
      navigate('/employees');
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  return (
    <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee Code"
          name="employee_code"
          value={employeeData.employee_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Employee Name"
          name="employee_name"
          value={employeeData.employee_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone No"
          name="phone_no"
          value={employeeData.phone_no}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Employee
        </Button>
      </form>
    </Container>
  );
}

export default AddEmployee;
