import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './login.css';

const Board_type = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8087/board_type', {
                username,
                password,
                address
            });
            alert('Board details registered successfully.');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('Error during entering Board details.');
            } else {
                console.error('Error during entering values', error);
            }
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Customer Details</h2>
            <div className="input-container">
                <select id="Plys" name="Plys"  value={username} onChange={(e) => setUsername(e.target.value)} required >
                    <option value="">No. of Plys</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                </select>
                <label>No. of Plys</label>
            </div>
            <div className="input-container">
                <select id="Top_flap" name="Top_flap" value={address} onChange={(e) => setAddress(e.target.value)} required>
                    <option value="">Select Yes/No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <label>Customer Rating</label>
            </div>
            
            <div className="input-container">
                <select id="Bottom_flap" name="Bottom_flap" value={password} onChange={(e) => setPassword(e.target.value)} required >
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

export default Board_type;
