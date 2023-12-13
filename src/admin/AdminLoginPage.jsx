import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import '../scss/AdminLoginPage.scss';

export function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('');

    const performLogin = async (email, password) => {
        try {
            const response = await axios.post('user/login', { email, password });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/admin/dashboard');
            }
        } catch {
            alert('Login failed. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await performLogin(email, password);
    };

    return (
        <div className="Admin">
            <div className='backgroundAdmin'><span>Login</span></div>
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

