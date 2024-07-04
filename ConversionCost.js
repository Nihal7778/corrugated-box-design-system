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

function ConversionCost() {
  const [costs, setCosts] = useState([]);
  const [editCost, setEditCost] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCost, setNewCost] = useState({
    'Select the cost basis': '',
    unit: '',
    corrugator_1_3ply: '',
    corrugator_1_5ply: '',
    corrugator_2_3ply: '',
    corrugator_2_5ply: '',
    corrugator_3_3ply: '',
    corrugator_3_5ply: ''
  });

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await axios.post('http://localhost:5001/conversioncost');
        setCosts(response.data);
      } catch (err) {
        console.error('Error fetching conversion costs:', err);
      }
    };

    fetchCosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/conversioncost/${id}`);
      setCosts(costs.filter(cost => cost.id !== id));
    } catch (err) {
      console.error('Error deleting conversion cost:', err);
    }
  };

  const handleEdit = (cost) => {
    setEditCost(cost);
  };

  const handleEditChange = (e) => {
    setEditCost({ ...editCost, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/conversioncost/${editCost.id}`, editCost);
      setCosts(costs.map(cost => cost.id === editCost.id ? response.data : cost));
      setEditCost(null);
    } catch (err) {
      console.error('Error updating conversion cost:', err);
    }
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddChange = (e) => {
    setNewCost({ ...newCost, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/conversioncost/add', newCost);
      setCosts([...costs, response.data]);
      setAddDialogOpen(false);
      setNewCost({
        'Select the cost basis': '',
        unit: '',
        corrugator_1_3ply: '',
        corrugator_1_5ply: '',
        corrugator_2_3ply: '',
        corrugator_2_5ply: '',
        corrugator_3_3ply: '',
        corrugator_3_5ply: ''
      });
    } catch (err) {
      console.error('Error adding conversion cost:', err);
    }
  };

  return (
    <div>
      <Typography variant="h6">Conversion Cost</Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary" style={{ marginBottom: '20px' }}>
        Add Conversion Cost
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select the cost basis</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Corrugator 1 (3 Ply)</TableCell>
              <TableCell>Corrugator 1 (5 Ply)</TableCell>
              <TableCell>Corrugator 2 (3 Ply)</TableCell>
              <TableCell>Corrugator 2 (5 Ply)</TableCell>
              <TableCell>Corrugator 3 (3 Ply)</TableCell>
              <TableCell>Corrugator 3 (5 Ply)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {costs.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost['Select the cost basis']}</TableCell>
                <TableCell>{cost.unit}</TableCell>
                <TableCell>{cost.corrugator_1_3ply}</TableCell>
                <TableCell>{cost.corrugator_1_5ply}</TableCell>
                <TableCell>{cost.corrugator_2_3ply}</TableCell>
                <TableCell>{cost.corrugator_2_5ply}</TableCell>
                <TableCell>{cost.corrugator_3_3ply}</TableCell>
                <TableCell>{cost.corrugator_3_5ply}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(cost)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cost.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {editCost && (
        <Dialog open={true} onClose={() => setEditCost(null)}>
          <DialogTitle>Edit Conversion Cost</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details of the conversion cost.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Select the cost basis"
              name="Select the cost basis"
              value={editCost['Select the cost basis']}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Unit"
              name="unit"
              value={editCost.unit}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Corrugator 1 (3 Ply)"
              name="corrugator_1_3ply"
              value={editCost.corrugator_1_3ply}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Corrugator 1 (5 Ply)"
              name="corrugator_1_5ply"
              value={editCost.corrugator_1_5ply}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Corrugator 2 (3 Ply)"
              name="corrugator_2_3ply"
              value={editCost.corrugator_2_3ply}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Corrugator 2 (5 Ply)"
              name="corrugator_2_5ply"
              value={editCost.corrugator_2_5ply}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Corrugator 3 (3 Ply)"
              name="corrugator_3_3ply"
              value={editCost.corrugator_3_3ply}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Corrugator 3 (5 Ply)"
              name="corrugator_3_5ply"
              value={editCost.corrugator_3_5ply}
              onChange={handleEditChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditCost(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Conversion Cost</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the details of the new conversion cost.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Select the cost basis"
            name="Select the cost basis"
            value={newCost['Select the cost basis']}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Unit"
            name="unit"
            value={newCost.unit}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Corrugator 1 (3 Ply)"
            name="corrugator_1_3ply"
            value={newCost.corrugator_1_3ply}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Corrugator 1 (5 Ply)"
            name="corrugator_1_5ply"
            value={newCost.corrugator_1_5ply}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Corrugator 2 (3 Ply)"
            name="corrugator_2_3ply"
            value={newCost.corrugator_2_3ply}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Corrugator 2 (5 Ply)"
            name="corrugator_2_5ply"
            value={newCost.corrugator_2_5ply}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Corrugator 3 (3 Ply)"
            name="corrugator_3_3ply"
            value={newCost.corrugator_3_3ply}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Corrugator 3 (5 Ply)"
            name="corrugator_3_5ply"
            value={newCost.corrugator_3_5ply}
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

export default ConversionCost;
