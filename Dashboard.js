import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styled from 'styled-components';
import { useCustomerContext } from './CustomerCountContext';

const DashboardContainer = styled.div`
  padding-top: 64px; /* Height of the AppBar */
  display: flex;
`;

const DashboardCard = styled(Paper)`
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function DashboardContent() {
  const { customerCount } = useCustomerContext();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5001/employees/count');
        setEmployeeCount(response.data.count);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DashboardContainer>
      <Sidebar isOpen={isSidebarOpen} />
      <div style={{ flex: 1 }}>
        <Topbar toggleSidebar={toggleSidebar} />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <DashboardCard>
                <Typography variant="h6">Customers</Typography>
                <Typography variant="h4">{customerCount}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/customers')}
                >
                  Manage Customers
                </Button>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <DashboardCard>
                <Typography variant="h6">Employees</Typography>
                <Typography variant="h4">{employeeCount}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/employees')}
                >
                  Manage Employees
                </Button>
              </DashboardCard>
            </Grid>
          </Grid>
        </Container>
      </div>
    </DashboardContainer>
  );
}

function Dashboard() {
  return (
    <DashboardContent />
  );
}

export default Dashboard;
