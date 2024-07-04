import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './login.css';

const Cust = () => {
    const [C_code, setC_code] = useState('');
    const [S_code, setS_code] = useState('');
    const [C_name, setC_name] = useState('');
    const [C_rating, setC_rating] = useState('');
    const [Offer_code, setOffer_code] = useState('');
    const [Job_desc, setJob_desc] = useState('');
    const [Order_quan, setOrder_quan] = useState('');
    const [Box_price, setBox_price] = useState('');
    const [Company, setCompany] = useState('');
    const [Contact, setContact] = useState('');
    const [PhNo, setPhNo] = useState('');
    const [Email, setEmail] = useState('');
    const [isC_details, setisC_details] = useState(true);
    const [isCust, setisCust] = useState(false);
    const navigate = useNavigate();

    const handleC_details = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8087/customer_details', {
                C_code,
                S_code,
                C_name,
                C_rating,
                Offer_code,
                Job_desc,
                Order_quan,
                Box_price
            });
            alert('Customer details registered successfully.');
            //navigate('/printing_details');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('Error during entering customer details.');
            } else {
                console.error('Error during entering details:', error);
            }
        }
    };

    const handleCust = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8087/customer', {
                Company,
                Contact,
                PhNo,
                Email
            });
            alert('Customer details registered successfully.');
            //navigate('/printing_details');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('Error during entering customer details.');
            } else {
                console.error('Error during entering details:', error);
            }
        }
    };

    return (
        <div>
            {isC_details ? (
                <form onSubmit={handleC_details}>
                    <h2>Customer Details</h2>
                    <div className="input-container">
                        <input type="text" name="Customer_code" value={C_code} onChange={(e) => setC_code(e.target.value)} required />
                        <label>Customer code</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Sales_Person_code" value={S_code} onChange={(e) => setS_code(e.target.value)} required />
                        <label>Sales Person code</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Customer" value={C_name} onChange={(e) => setC_name(e.target.value)} required />
                        <label>Customer</label>
                    </div>
                    <div className="input-container">
                        <select id="Customer_rating" name="Customer_rating" value={C_rating} onChange={(e) => setC_rating(e.target.value)} required>
                            <option value="">Select Rating</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <label>Customer Rating</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Offer_code" value={Offer_code} onChange={(e) => setOffer_code(e.target.value)} required />
                        <label>Offer_code</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Job_Description" value={Job_desc} onChange={(e) => setJob_desc(e.target.value)} required />
                        <label>Job Description</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Order_Quantity" value={Order_quan} onChange={(e) => setOrder_quan(e.target.value)} required />
                        <label>Order Quantity, nos</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Box_Price" value={Box_price} onChange={(e) => setBox_price(e.target.value)} required />
                        <label>Box Price</label>
                    </div>
                    <button type = "submit" />
                    <button type="button" onClick={() => { setisC_details(false); setisCust(true); }}>next</button>
                </form>
            ) : null}

            {isCust ? (
                <form onSubmit={handleCust}>
                    <h2>Customer Details</h2>
                    <div className="input-container">
                        <input type="text" name="Company" value={Company} onChange={(e) => setCompany(e.target.value)} required />
                        <label>Company name</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="Contact" value={Contact} onChange={(e) => setContact(e.target.value)} required />
                        <label>Contact Person</label>
                    </div>
                    <div className="input-container">
                        <input type="text" name="PhNo" value={PhNo} onChange={(e) => setPhNo(e.target.value)} required />
                        <label>PhNo</label>
                    </div>
                    <div className="input-container">
                        <input type="email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Email</label>
                    </div>
                    <button type="submit" onClick={() => { setisCust(true); }}>next</button>
                </form>
            ) : null}
        </div>
    );
};

export default Cust;
