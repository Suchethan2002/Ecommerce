// ChangePasswordForm.js

import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = () => {
    const token = localStorage.getItem('token');

    // Add the token to the request headers
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { oldPassword, newPassword, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            console.log('Passwords do not match');
        } else {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/change-password', {
                    oldPassword,
                    newPassword,
                    config
                });
                console.log(res.data);
            } catch (err) {
                console.error(err.response);
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={onChange}
                required
            />
            <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={onChange}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
            />
            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePasswordForm;
