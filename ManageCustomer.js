import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useCustomerContext } from './CustomerCountContext';

function ManageCustomer() {
  const { customers, customerCount, updateCustomer } = useCustomerContext();
  const [localCustomers, setLocalCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    customer_code: '',
    company_name: '',
    rating: '',
    contact_person: '',
    phone_no: '',
    email: ''
  });

  useEffect(() => {
    setLocalCustomers(customers);
  }, [customers]);

  const handleDelete = async (customer_code) => {
    try {
      await axios.post('http://localhost:5001/customers/delete', { customer_code });
      setLocalCustomers(localCustomers.filter(customer => customer.customer_code !== customer_code));
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
      await axios.post('http://localhost:5001/customers/update', editCustomer);
      updateCustomer(editCustomer);
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
      setLocalCustomers([...localCustomers, response.data]);
      setAddDialogOpen(false);
      setNewCustomer({
        customer_code: '',
        company_name: '',
        rating: '',
        contact_person: '',
        phone_no: '',
        email: ''
      });
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Customer
      </Typography>
      <Typography variant="body1">Total Customers: {customerCount}</Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary" style={{ marginBottom: '20px' }}>
        Add Customer
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Code</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localCustomers.map((customer) => (
              <TableRow key={customer.customer_code}>
                <TableCell>{customer.customer_code}</TableCell>
                <TableCell>{customer.company_name}</TableCell>
                <TableCell>{customer.rating}</TableCell>
                <TableCell>{customer.contact_person}</TableCell>
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
            <DialogContentText>
              Edit the details of the customer.
            </DialogContentText>
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
              label="Company Name"
              name="company_name"
              value={editCustomer.company_name}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Rating"
              name="rating"
              value={editCustomer.rating}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Contact Person"
              name="contact_person"
              value={editCustomer.contact_person}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone No"
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

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Customer Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the details of the new customer.
          </DialogContentText>
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
            label="Company Name"
            name="company_name"
            value={newCustomer.company_name}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Rating"
            name="rating"
            value={newCustomer.rating}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contact Person"
            name="contact_person"
            value={newCustomer.contact_person}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone No"
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
    </Container>
  );
}

export default ManageCustomer;
