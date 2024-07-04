import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function CorrugatedMachines() {
  const [machines, setMachines] = useState([]);
  const [editMachine, setEditMachine] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newMachine, setNewMachine] = useState({
    content: '',
    col_1: '',
    col_2: '',
    col_3: '',
    col_4: ''
  });

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.post('http://localhost:5001/corrugatedmachines');
        setMachines(response.data);
      } catch (err) {
        console.error('Error fetching machines:', err);
      }
    };

    fetchMachines();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:5001/corrugatedmachines/delete', { id });
      setMachines(machines.filter(machine => machine.id !== id));
    } catch (err) {
      console.error('Error deleting machine:', err);
    }
  };

  const handleEdit = (machine) => {
    setEditMachine(machine);
  };

  const handleEditChange = (e) => {
    setEditMachine({ ...editMachine, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/corrugatedmachines/update', editMachine);
      setMachines(machines.map(machine => machine.id === editMachine.id ? response.data : machine));
      setEditMachine(null);
    } catch (err) {
      console.error('Error updating machine:', err);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddChange = (e) => {
    setNewMachine({ ...newMachine, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/corrugatedmachines/add', newMachine);
      setMachines([...machines, response.data]);
      setAddDialogOpen(false);
      setNewMachine({
        content: '',
        col_1: '',
        col_2: '',
        col_3: '',
        col_4: ''
      });
    } catch (err) {
      console.error('Error adding machine:', err);
    }
  };

  return (
    <div>
      <Typography variant="h6">Corrugated Machines</Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary" style={{ marginBottom: '20px' }}>
        Add Machine
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              <TableCell>Column 3</TableCell>
              <TableCell>Column 4</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.content}</TableCell>
                <TableCell>{machine.col_1}</TableCell>
                <TableCell>{machine.col_2}</TableCell>
                <TableCell>{machine.col_3}</TableCell>
                <TableCell>{machine.col_4}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(machine)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(machine.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {editMachine && (
        <Dialog open={true} onClose={() => setEditMachine(null)}>
          <DialogTitle>Edit Machine</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details of the machine.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Content"
              name="content"
              value={editMachine.content}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Column 1"
              name="col_1"
              value={editMachine.col_1}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Column 2"
              name="col_2"
              value={editMachine.col_2}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Column 3"
              name="col_3"
              value={editMachine.col_3}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Column 4"
              name="col_4"
              value={editMachine.col_4}
              onChange={handleEditChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditMachine(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Machine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the details of the new machine.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Content"
            name="content"
            value={newMachine.content}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column 1"
            name="col_1"
            value={newMachine.col_1}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column 2"
            name="col_2"
            value={newMachine.col_2}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column 3"
            name="col_3"
            value={newMachine.col_3}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column 4"
            name="col_4"
            value={newMachine.col_4}
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
    </div>
  );
}

export default CorrugatedMachines;
