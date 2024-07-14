import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.post('http://localhost:5001/customers');
        setCustomers(response.data);
      } catch (err) {
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  const updateCustomer = async (updatedCustomer) => {
    try {
      const response = await axios.post('http://localhost:5001/customers/update', updatedCustomer);
      setCustomers(customers.map(customer => customer.customer_code === updatedCustomer.customer_code ? response.data : customer));
    } catch (err) {
      console.error('Error updating customer:', err);
    }
  };

  return (
    <CustomerContext.Provider value={{ customers, updateCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
