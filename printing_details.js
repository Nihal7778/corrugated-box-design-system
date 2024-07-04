import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './login.css';

const Print = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8087/printing_details', {
                username,
                password,
                address
            });
            alert('Printing details registered successfully.');
            navigate('/board_type');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('Error during entering printing details.');
            } else {
                console.error('Error during entering values', error);
            }
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Customer Details</h2>
            <div className="input-container">
                <input type="number" name="Flexo" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label>Flexo</label>
            </div>
            <div className="input-container">
                <select id="Gravur" name="Gravur" value={address} onChange={(e) => setAddress(e.target.value)} required>
                    <option value="">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <label>Customer Rating</label>
            </div>
            
            <div className="input-container">
                <select id="Varnish_coat" name="Varnish_coat" value={password} onChange={(e) => setPassword(e.target.value)} required >
                    <option value="">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <label>Job Description</label>
            </div>
            <button type="submit">SUBMIT</button>
        </form>
    );
};

export default Print;
