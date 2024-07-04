import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';

function AddCustomer() {
  const [customer, setCustomer] = useState({
    customer_code: '',
    company_name: '',
    rating: '',
    contact_person: '',
    phone_no: '',
    email: ''
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/customers/add', customer);
      console.log(response.data);
      // Reset form
      setCustomer({
        customer_code: '',
        company_name: '',
        rating: '',
        contact_person: '',
        phone_no: '',
        email: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="customer_code"
          label="Customer Code"
          value={customer.customer_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="company_name"
          label="Company Name"
          value={customer.company_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="rating"
          label="Rating"
          value={customer.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="contact_person"
          label="Contact Person"
          value={customer.contact_person}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone_no"
          label="Phone No"
          value={customer.phone_no}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={customer.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Customer
        </Button>
      </form>
    </Container>
  );
}

export default AddCustomer;
