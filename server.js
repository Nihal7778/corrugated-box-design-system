// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const PORT = process.env.PORT || 8087;

const app = express();

let CustomerCode = null;
let SalesPersonCode = null;


app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  // other options if needed
};

app.use(cors(corsOptions));


const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

ADMIN_KEY = 'jZGexbjKDY2yXoL24ohWdF0ZUhrzlQ19'
const SECRET_KEY = 'Yl:7$7?,{(VR{^&E9[nCwnIlB]nQi)';

app.post('/signup', async (req, res) => {
  const { username, password, adminKey } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Moved here

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const result2 = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);

    if (result.rows.length > 0 || result2.rows.length > 0) {
      return res.status(409).send('User already exists');
    }

    if (adminKey) {
      if (adminKey === ADMIN_KEY) {
        await pool.query('INSERT INTO admins (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);
        return res.status(201).send('Admin registered successfully');
      } else {
        return res.status(401).send('Invalid Admin Key');
      }
    } else {
      await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);
      return res.status(201).send('User registered successfully');
    }
    
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).send('Error registering user');
  }
});

app.post('/customer_details', async (req, res) => {
  const { C_code,
    S_code,
    C_name,
    C_rating,
    Offer_code,
    Job_desc,
    Order_quan,
    Box_price } = req.body;

  try {
    const result = await pool.query('SELECT * FROM Customer_details WHERE Customer_code = $1', [C_code]);

    if (result.rows.length > 0) {
      await pool.query(
        'UPDATE Customer_details SET Sales_Person_code = $1, Customer = $2, Customer_rating = $3, Design_Offer_code = $4, Job_Description = $5, Order_Quantity = $6, Box_Price = $7 WHERE Customer_code = $8',
        [S_code,
          C_name,
          C_rating,
          Offer_code,
          Job_desc,
          Order_quan,
          Box_price,
          C_code]
      );
      CustomerCode = C_code;
      SalesPersonCode = S_code;
      return res.status(201).send('Customer details updated successfully.');
    } else {
      await pool.query(
        'INSERT INTO Customer_details (Customer_code, Sales_Person_code, Customer, Customer_rating, Design_Offer_code, Job_Description, Order_Quantity, Box_Price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [C_code,
          S_code,
          C_name,
          C_rating,
          Offer_code,
          Job_desc,
          Order_quan,
          Box_price]
      );
      CustomerCode = C_code;
      SalesPersonCode = S_code;
      return res.status(201).send('Customer details registered successfully.');
    }
    
  } catch (error) {
    console.error('Error during entering customer details:', error);
    return res.status(500).send('Error during entering customer details.');
  }
});

app.post('/customer', async (req, res) => {
  const { Company,
    Contact,
    PhNo,
    Email} = req.body;

  try {
    const result = await pool.query('SELECT * FROM CUSTOMER WHERE Customer_code = $1', [CustomerCode]);

    if (result.rows.length > 0) {
      await pool.query(
        'UPDATE CUSTOMER SET Sales_Person_code = $1, Company_name = $2, Contact_person = $3, PhNo = $4, Email = $5 WHERE Customer_code = $6',
        [ SalesPersonCode,
          Company,
          Contact,
          PhNo,
          Email,
          CustomerCode]
      );
      return res.status(201).send('Customer details updated successfully.');
    } else {
      await pool.query(
        'INSERT INTO CUSTOMER (Customer_code, Sales_Person_code, Company_name, Contact_person, PhNo, Email) VALUES ($1, $2, $3, $4, $5, $6)',
        [CustomerCode,
          SalesPersonCode,
          Company,
          Contact,
          PhNo,
          Email]
      );
      return res.status(201).send('Customer details registered successfully.');
    }
    
  } catch (error) {
    console.error('Error during entering customer details:', error);
    return res.status(500).send('Error during entering customer details.');
  }
});
app.post('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Customer');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/customers/add', async (req, res) => {
  const { customer_code, company_name, rating, contact_person, phone_no, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ManageCustomer (customer_code, company_name, rating, contact_person, phone_no, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customer_code, company_name, rating, contact_person, phone_no, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding customer:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/customers/update', async (req, res) => {
  const { customer_code, company_name, rating, contact_person, phone_no, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE ManageCustomer SET company_name = $2, rating = $3, contact_person = $4, phone_no = $5, email = $6 WHERE customer_code = $1 RETURNING *',
      [customer_code, company_name, rating, contact_person, phone_no, email]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating customer:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/customers/delete', async (req, res) => {
  const { customer_code } = req.body;
  try {
    const result = await pool.query('DELETE FROM ManageCustomer WHERE customer_code = $1', [customer_code]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting customer:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/printing_details', async (req, res) => {
  const { username, password, address} = req.body;
  try {
    await pool.query('INSERT INTO Printing_details VALUES($1, $2, $3)', [username,address, password]);
    return res.status(201).send('Printing details registered successfully.');
  } catch (error) {
    console.error('Error during entering printing details:', error);
    return res.status(500).send('Error during entering printing details.');
  }
});

app.post('/board_type', async (req, res) => {
  const { username, password, address} = req.body;
  try {
    await pool.query('INSERT INTO Board_type VALUES($1, $2, $3)', [username,address, password]);
    return res.status(201).send('Board details registered successfully.');
  } catch (error) {
    console.error('Error during entering Board details:', error);
    return res.status(500).send('Error during entering Board details.');
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const adminResult = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);

  let user = null;
  let role = null;

  if (userResult.rows.length > 0) {
    user = userResult.rows[0];
    role = 'user';
  } else if (adminResult.rows.length > 0) {
    user = adminResult.rows[0];
    role = 'admin';
  }

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (validPassword) {
      const token = jwt.sign({ userId: user.id, role }, SECRET_KEY);
      return res.json({ token, role });
    } else {
      return res.status(401).send('Invalid credentials');
    }
  } else {
    return res.status(404).send('Invalid email');
  }
});

app.listen(8087, () => {
  console.log('Server is running on port:', {PORT});
});
