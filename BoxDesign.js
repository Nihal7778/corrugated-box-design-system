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

function BoxDesign() {
  const [boxDesigns, setBoxDesigns] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState({
    id: '',
    content: '',
    row_num: '',
    col_num: '',
    value: ''
  });

  useEffect(() => {
    const fetchBoxDesigns = async () => {
      try {
        const response = await axios.post('http://localhost:5001/boxdesign');
        setBoxDesigns(response.data);
      } catch (err) {
        console.error('Error fetching box designs:', err);
      }
    };

    fetchBoxDesigns();
  }, []);

  const handleEditClick = (design) => {
    setCurrentDesign(design);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentDesign({ ...currentDesign, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/boxdesign/update/${currentDesign.id}`, currentDesign);
      setBoxDesigns(boxDesigns.map(design => design.id === currentDesign.id ? response.data : design));
      setEditDialogOpen(false);
    } catch (err) {
      console.error('Error updating box design:', err);
    }
  };

  const handleAddClick = () => {
    setCurrentDesign({
      id: '',
      content: '',
      row_num: '',
      col_num: '',
      value: ''
    });
    setAddDialogOpen(true);
  };

  const handleAddChange = (e) => {
    setCurrentDesign({ ...currentDesign, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/boxdesign/add', currentDesign);
      setBoxDesigns([...boxDesigns, response.data]);
      setAddDialogOpen(false);
    } catch (err) {
      console.error('Error adding box design:', err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/boxdesign/${id}`);
      setBoxDesigns(boxDesigns.filter(design => design.id !== id));
    } catch (err) {
      console.error('Error deleting box design:', err);
    }
  };

  return (
    <div>
      <Typography variant="h6">Box Design</Typography>
      <Button startIcon={<AddIcon />} onClick={handleAddClick} color="primary">
        Add Box Design
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Row Number</TableCell>
              <TableCell>Column Number</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boxDesigns.map((design) => (
              <TableRow key={design.id}>
                <TableCell>{design.content}</TableCell>
                <TableCell>{design.row_num}</TableCell>
                <TableCell>{design.col_num}</TableCell>
                <TableCell>{design.value}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(design)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(design.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Box Design</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Content"
            name="content"
            value={currentDesign.content}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Row Number"
            name="row_num"
            value={currentDesign.row_num}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column Number"
            name="col_num"
            value={currentDesign.col_num}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Value"
            name="value"
            value={currentDesign.value}
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
        <DialogTitle>Add Box Design</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Content"
            name="content"
            value={currentDesign.content}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Row Number"
            name="row_num"
            value={currentDesign.row_num}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Column Number"
            name="col_num"
            value={currentDesign.col_num}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Value"
            name="value"
            value={currentDesign.value}
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

export default BoxDesign;
