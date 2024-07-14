import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    sales_person_code: '',
    customer_code: '',
    employee_code: '',
    employee_name: '',
    phone_no: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/employees/add', employee);
      console.log(response.data); // Debug: Log the added data
      navigate('/employees');
    } catch (err) {
      console.error('Error adding employee:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          label="Sales Person Code"
          name="sales_person_code"
          value={employee.sales_person_code}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Customer Code"
          name="customer_code"
          value={employee.customer_code}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Employee Code"
          name="employee_code"
          value={employee.employee_code}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Employee Name"
          name="employee_name"
          value={employee.employee_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone No"
          name="phone_no"
          value={employee.phone_no}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Employee
        </Button>
      </form>
    </Container>
  );
}

export default AddEmployee;
