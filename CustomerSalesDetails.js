import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

function CustomerSalesDetails() {
  const { code } = useParams();
  const [data, setData] = useState({
    boxDesigns: [],
    corrugatedMachines: [],
    conversionCosts: [],
    printingCosts: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boxDesigns, corrugatedMachines, conversionCosts, printingCosts] = await Promise.all([
          axios.post(`http://localhost:5001/boxdesign/filter`, { sales_person_code: code, customer_code: code }),
          axios.post(`http://localhost:5001/corrugatedmachines/filter`, { sales_person_code: code, customer_code: code }),
          axios.post(`http://localhost:5001/conversioncost/filter`, { sales_person_code: code, customer_code: code }),
          axios.post(`http://localhost:5001/printingcost/filter`, { sales_person_code: code, customer_code: code })
        ]);

        setData({
          boxDesigns: boxDesigns.data,
          corrugatedMachines: corrugatedMachines.data,
          conversionCosts: conversionCosts.data,
          printingCosts: printingCosts.data
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [code]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Details for Code: {code}
      </Typography>
      <Paper>
        <Typography variant="h6">Box Designs</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Row Number</TableCell>
              <TableCell>Column Number</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.boxDesigns.map((design) => (
              <TableRow key={design.id}>
                <TableCell>{design.content}</TableCell>
                <TableCell>{design.row_num}</TableCell>
                <TableCell>{design.col_num}</TableCell>
                <TableCell>{design.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper>
        <Typography variant="h6">Corrugated Machines</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              <TableCell>Column 3</TableCell>
              <TableCell>Column 4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.corrugatedMachines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.content}</TableCell>
                <TableCell>{machine.col_1}</TableCell>
                <TableCell>{machine.col_2}</TableCell>
                <TableCell>{machine.col_3}</TableCell>
                <TableCell>{machine.col_4}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper>
        <Typography variant="h6">Conversion Costs</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cost Basis</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Corrugator 1 (3 Ply)</TableCell>
              <TableCell>Corrugator 1 (5 Ply)</TableCell>
              <TableCell>Corrugator 2 (3 Ply)</TableCell>
              <TableCell>Corrugator 2 (5 Ply)</TableCell>
              <TableCell>Corrugator 3 (3 Ply)</TableCell>
              <TableCell>Corrugator 3 (5 Ply)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.conversionCosts.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost.cost_basis}</TableCell>
                <TableCell>{cost.unit}</TableCell>
                <TableCell>{cost.corrugator_1_3ply}</TableCell>
                <TableCell>{cost.corrugator_1_5ply}</TableCell>
                <TableCell>{cost.corrugator_2_3ply}</TableCell>
                <TableCell>{cost.corrugator_2_5ply}</TableCell>
                <TableCell>{cost.corrugator_3_3ply}</TableCell>
                <TableCell>{cost.corrugator_3_5ply}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper>
        <Typography variant="h6">Printing Costs</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Printing Cost Details</TableCell>
              <TableCell>Column 1</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.printingCosts.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost.printing_cost_details_rs_per_m2}</TableCell>
                <TableCell>{cost.col_1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default CustomerSalesDetails;
