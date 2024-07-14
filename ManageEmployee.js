import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    sales_person_code: '',
    customer_code: '',
    customer_name: '',
    phone_no: '',
    email: ''
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.post('http://localhost:5001/customers');
        setCustomers(response.data);
      } catch (err) {
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customer_code) => {
    try {
      await axios.post('http://localhost:5001/customers/delete', { customer_code });
      setCustomers(customers.filter(customer => customer.customer_code !== customer_code));
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
  };

  const handleEditChange = (e) => {
    setEditCustomer({ ...editCustomer, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/customers/update', editCustomer);
      setCustomers(customers.map(customer => customer.customer_code === editCustomer.customer_code ? response.data : customer));
      setEditCustomer(null);
    } catch (err) {
      console.error('Error updating customer:', err);
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
      const response = await axios.post('http://localhost:5001/customers/add', newCustomer);
      setCustomers([...customers, response.data]);
      setAddDialogOpen(false);
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Customer
      </Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary" style={{ marginBottom: '20px' }}>
        Add Customer
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sales Person Code</TableCell>
              <TableCell>Customer Code</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customer_code}>
                <TableCell>
                  <a href={`/details/${customer.sales_person_code}`}>{customer.sales_person_code}</a>
                </TableCell>
                <TableCell>
                  <a href={`/details/${customer.customer_code}`}>{customer.customer_code}</a>
                </TableCell>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell>{customer.phone_no}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(customer)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(customer.customer_code)} color="secondary">
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
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
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
              label="Customer Code"
              name="customer_code"
              value={editCustomer.customer_code}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Customer Name"
              name="customer_name"
              value={editCustomer.customer_name}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone Number"
              name="phone_no"
              value={editCustomer.phone_no}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={editCustomer.email}
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

      {addDialogOpen && (
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
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
              label="Customer Code"
              name="customer_code"
              value={newCustomer.customer_code}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Customer Name"
              name="customer_name"
              value={newCustomer.customer_name}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone Number"
              name="phone_no"
              value={newCustomer.phone_no}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={newCustomer.email}
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
      )}
    </Container>
  );
}

export default ManageCustomer;
