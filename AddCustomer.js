import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const [customer, setCustomer] = useState({
    sales_person_code: '',
    customer_code: '',
    customer: '',
    customer_rating: '',
    design_offer_code: '',
    job_description: '',
    order_quantity: '',
    box_price: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/customerdetails/add', customer);
      console.log(response.data); // Debug: Log the added data
      navigate('/customers');
    } catch (err) {
      console.error('Error adding customer:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          label="Sales Person Code"
          name="sales_person_code"
          value={customer.sales_person_code}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Customer Code"
          name="customer_code"
          value={customer.customer_code}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Customer"
          name="customer"
          value={customer.customer}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Customer Rating"
          name="customer_rating"
          value={customer.customer_rating}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Design Offer Code"
          name="design_offer_code"
          value={customer.design_offer_code}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Job Description"
          name="job_description"
          value={customer.job_description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Order Quantity"
          name="order_quantity"
          value={customer.order_quantity}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Box Price"
          name="box_price"
          value={customer.box_price}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Customer
        </Button>
      </form>
    </Container>
  );
}

export default AddCustomer;
