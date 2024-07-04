import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5001/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleEditChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/employees/${editEmployee.id}`, editEmployee);
      setEmployees(employees.map(employee => employee.id === editEmployee.id ? response.data : employee));
      setEditEmployee(null);
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Employee
      </Typography>
      <Button component={Link} to="/employees/add" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Add Employee
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Code</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employee_code}</TableCell>
                <TableCell>{employee.employee_name}</TableCell>
                <TableCell>{employee.phone_no}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(employee)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {editEmployee && (
        <Dialog open={true} onClose={() => setEditEmployee(null)}>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details of the employee.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Employee Code"
              name="employee_code"
              value={editEmployee.employee_code}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Employee Name"
              name="employee_name"
              value={editEmployee.employee_name}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone No"
              name="phone_no"
              value={editEmployee.phone_no}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={editEmployee.email}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Action"
              name="action"
              value={editEmployee.action}
              onChange={handleEditChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditEmployee(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default ManageEmployee;
