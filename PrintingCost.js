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

function PrintingCost() {
  const [costs, setCosts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentCost, setCurrentCost] = useState({
    id: '',
    printing_cost_details_rs_per_m2: '',
    col_1: ''
  });

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const response = await axios.post('http://localhost:5001/printingcost');
        setCosts(response.data);
      } catch (err) {
        console.error('Error fetching printing costs:', err);
      }
    };

    fetchCosts();
  }, []);

  const handleEditClick = (cost) => {
    setCurrentCost(cost);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentCost({ ...currentCost, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/printingcost/update/${currentCost.id}`, currentCost);
      setCosts(costs.map(cost => cost.id === currentCost.id ? response.data : cost));
      setEditDialogOpen(false);
    } catch (err) {
      console.error('Error updating printing cost:', err);
    }
  };

  const handleAddClick = () => {
    setCurrentCost({
      id: '',
      printing_cost_details_rs_per_m2: '',
      col_1: ''
    });
    setAddDialogOpen(true);
  };

  const handleAddChange = (e) => {
    setCurrentCost({ ...currentCost, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/printingcost/add', currentCost);
      setCosts([...costs, response.data]);
      setAddDialogOpen(false);
    } catch (err) {
      console.error('Error adding printing cost:', err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/printingcost/${id}`);
      setCosts(costs.filter(cost => cost.id !== id));
    } catch (err) {
      console.error('Error deleting printing cost:', err);
    }
  };

  return (
    <div>
      <Typography variant="h6">Printing Cost</Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary">
        Add Printing Cost
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Printing Cost Details</TableCell>
              <TableCell>Column 1</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {costs.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost['Printing Cost details, Rs / m²']}</TableCell>
                <TableCell>{cost.col_1}</TableCell>
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

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Printing Cost</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Printing Cost Details"
            name="printing_cost_details_rs_per_m2"
            value={currentCost['Printing Cost details, Rs / m²']}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column 1"
            name="col_1"
            value={currentCost.col_1}
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

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Printing Cost</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Printing Cost Details"
            name="printing_cost_details_rs_per_m2"
            value={currentCost['Printing Cost details, Rs / m²']}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column 1"
            name="col_1"
            value={currentCost.col_1}
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

export default PrintingCost;
