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
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function ConversionCost() {
  const [costs, setCosts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editCost, setEditCost] = useState(null);
  const [newCost, setNewCost] = useState({
    customer_code: '',
    select_the_cost_basis: '',
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

  const handleEditClick = (cost) => {
    setEditCost(cost);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setEditCost({ ...editCost, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/conversioncost/update', editCost);
      setCosts(costs.map(cost => cost.id === editCost.id ? response.data : cost));
      setEditDialogOpen(false);
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
    } catch (err) {
      console.error('Error adding conversion cost:', err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.post('http://localhost:5001/conversioncost/delete', { id });
      setCosts(costs.filter(cost => cost.id !== id));
    } catch (err) {
      console.error('Error deleting conversion cost:', err);
    }
  };

  return (
    <div>
      <Typography variant="h6">Conversion Cost</Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary">
        Add Conversion Cost
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Code</TableCell>
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
                <TableCell>
                  <a href={`/details/${cost.customer_code}`}>{cost.customer_code}</a>
                </TableCell>
                <TableCell>{cost.select_the_cost_basis}</TableCell>
                <TableCell>{cost.unit}</TableCell>
                <TableCell>{cost.corrugator_1_3ply}</TableCell>
                <TableCell>{cost.corrugator_1_5ply}</TableCell>
                <TableCell>{cost.corrugator_2_3ply}</TableCell>
                <TableCell>{cost.corrugator_2_5ply}</TableCell>
                <TableCell>{cost.corrugator_3_3ply}</TableCell>
                <TableCell>{cost.corrugator_3_5ply}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(cost)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(cost.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {editDialogOpen && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Conversion Cost</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Customer Code"
              name="customer_code"
              value={editCost.customer_code}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Select the cost basis"
              name="select_the_cost_basis"
              value={editCost.select_the_cost_basis}
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
            <Button onClick={() => setEditDialogOpen(false)} color="primary">
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
          <DialogTitle>Add Conversion Cost</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Customer Code"
              name="customer_code"
              value={newCost.customer_code}
              onChange={handleAddChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Select the cost basis"
              name="select_the_cost_basis"
              value={newCost.select_the_cost_basis}
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
      )}
    </div>
  );
}

export default ConversionCost;
