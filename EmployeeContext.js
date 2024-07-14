import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.post('http://localhost:5001/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, []);

  const updateEmployee = async (updatedEmployee) => {
    try {
      const response = await axios.post('http://localhost:5001/employees/update', updatedEmployee);
      setEmployees(employees.map(employee => employee.employee_code === updatedEmployee.employee_code ? response.data : employee));
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, updateEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
