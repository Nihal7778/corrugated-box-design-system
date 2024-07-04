import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    sales_person_code: '',
    customer: '',
    customer_rating: '',
    design_offer_code: '',
    job_description: '',
    order_quantity: '',
    box_price: ''
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.post('http://localhost:5001/customerdetails');
        console.log(response.data); // Debug: Log the response data
        setCustomers(response.data);
      } catch (err) {
        console.error('Error fetching customer details:', err);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:5001/customerdetails/delete', { id });
      setCustomers(customers.filter(customer => customer.sales_person_code !== id));
    } catch (err) {
      console.error('Error deleting customer detail:', err);
    }
  };

  // Set original_sales_person_code when opening the edit dialog
  const handleEdit = (customer) => {
    setEditCustomer({ ...customer, original_sales_person_code: customer.sales_person_code });
  };
  

  const handleEditChange = (e) => {
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/customerdetails/update', { 
        original_sales_person_code: editCustomer.original_sales_person_code || editCustomer.sales_person_code,
        ...editCustomer 
      });
      console.log(response.data); // Debug: Log the updated data
      setCustomers(customers.map(customer => customer.sales_person_code === editCustomer.original_sales_person_code ? response.data : customer));
      setEditCustomer(null);
    } catch (err) {
      console.error('Error updating customer detail:', err.response ? err.response.data : err.message);
    }
  };
  

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/customerdetails/add', newCustomer);
      console.log(response.data); // Debug: Log the added data
      setCustomers([...customers, response.data]);
      setAddDialogOpen(false);
      setNewCustomer({
        sales_person_code: '',
        customer: '',
        customer_rating: '',
        design_offer_code: '',
        job_description: '',
        order_quantity: '',
        box_price: ''
      });
    } catch (err) {
      console.error('Error adding customer detail:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary" style={{ marginBottom: '20px' }}>
        Add Customer Detail
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sales Person Code</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Customer Rating</TableCell>
              <TableCell>Design Offer Code</TableCell>
              <TableCell>Job Description</TableCell>
              <TableCell>Order Quantity</TableCell>
              <TableCell>Box Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.sales_person_code}>
                <TableCell>{customer.sales_person_code}</TableCell>
                <TableCell>{customer.customer}</TableCell>
                <TableCell>{customer.customer_rating}</TableCell>
                <TableCell>{customer.design_offer_code}</TableCell>
                <TableCell>{customer.job_description}</TableCell>
                <TableCell>{customer.order_quantity}</TableCell>
                <TableCell>{customer.box_price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(customer)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(customer.sales_person_code)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {editCustomer && (
        <Dialog open={true} onClose={() => setEditCustomer(null)}>
          <DialogTitle>Edit Customer Detail</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details of the customer.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Sales Person Code"
              name="sales_person_code"
              value={editCustomer.sales_person_code}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Customer"
              name="customer"
              value={editCustomer.customer}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Customer Rating"
              name="customer_rating"
              value={editCustomer.customer_rating}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Design Offer Code"
              name="design_offer_code"
              value={editCustomer.design_offer_code}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Job Description"
              name="job_description"
              value={editCustomer.job_description}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Order Quantity"
              name="order_quantity"
              value={editCustomer.order_quantity}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Box Price"
              name="box_price"
              value={editCustomer.box_price}
              onChange={handleEditChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditCustomer(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Customer Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the details of the new customer.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Sales Person Code"
            name="sales_person_code"
            value={newCustomer.sales_person_code}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Customer"
            name="customer"
            value={newCustomer.customer}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Customer Rating"
            name="customer_rating"
            value={newCustomer.customer_rating}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Design Offer Code"
            name="design_offer_code"
            value={newCustomer.design_offer_code}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Job Description"
            name="job_description"
            value={newCustomer.job_description}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Order Quantity"
            name="order_quantity"
            value={newCustomer.order_quantity}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Box Price"
            name="box_price"
            value={newCustomer.box_price}
            onChange={handleAddChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CustomerDetails;
