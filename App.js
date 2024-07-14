import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';
import ManageCustomer from './components/ManageCustomer';
import AddCustomer from './components/AddCustomer';
import ManageEmployee from './components/ManageEmployee';
import AddEmployee from './components/AddEmployee';
import BoxDesign from './components/BoxDesign';
import CorrugatedMachines from './components/CorrugatedMachines';
import ConversionCost from './components/ConversionCost';
import PrintingCost from './components/PrintingCost';
import CustomerDetails from './components/CustomerDetails';
import CustomerSalesDetails from './components/CustomerSalesDetails';
import { CustomerProvider } from './components/CustomerCountContext';

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <CustomerProvider>  
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
            <Route path="/customerdetails" element={<CustomerDetails />} />
            <Route path="/CustomerSalesDetails" element={<CustomerSalesDetails />} />
          </Routes>
        </CustomerProvider>
      </div>
    </Router>
  );
}

export default App;
