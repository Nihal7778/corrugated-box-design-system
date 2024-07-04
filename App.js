import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ManageCustomer from './components/ManageCustomer';
import AddCustomer from './components/AddCustomer';
import ManageEmployee from './components/ManageEmployee';
import AddEmployee from './components/AddEmployee';
import BoxDesign from './components/BoxDesign';
import CorrugatedMachines from './components/CorrugatedMachines';
import ConversionCost from './components/ConversionCost';
import PrintingCost from './components/PrintingCost';
import CustomerDetails from './components/CustomerDetails'; // Import CustomerDetails
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<ManageCustomer />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/employees" element={<ManageEmployee />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/boxdesign" element={<BoxDesign />} />
          <Route path="/corrugatedmachines" element={<CorrugatedMachines />} />
          <Route path="/conversioncost" element={<ConversionCost />} />
          <Route path="/printingcost" element={<PrintingCost />} />
          <Route path="/customerdetails" element={<CustomerDetails />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
