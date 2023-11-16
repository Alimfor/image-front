import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/api/auth/login';
const SUCCESS_AUTHENTICATE_URL = '/';
const DEFAULT_URL_FOR_FIRST_ROLE = '/link';

const Login = () => {

    const redirectUrl = [
        { 'ROLE_ADMIN': '/main-a' },
        { 'ROLE_FIRST': '/link' },
        { 'ROLE_USER': '/main-u' }
    ]

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || SUCCESS_AUTHENTICATE_URL;

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                {
                    userEmail: email,
                    password: pwd
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );


            const accessToken = response?.data.accessToken;
            const role = response?.data?.role;
            setAuth({ email, pwd, role, accessToken });

            setEmail('');
            setPwd('');

            const userRoleOject = redirectUrl.find(obj => role in obj);
            const userRedirectUrl = userRoleOject ? userRoleOject[role] : '/main';
            navigate(userRedirectUrl, { replace: true });
        } catch (error) {
            if (!error?.response) {
                console.log(error);
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="login max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <Link to="/" className="absolute right-4 top-4 bg-blue-500 px-4 py-2 text-white rounded">
                Come back
            </Link>
            <p
                ref={errRef}
                className={`text-red-600 ${errMsg ? '' : 'hidden'}`}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="email" className="block">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />

                <label htmlFor="password" className="block">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    ref={userRef}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    className="w-full px-4 py-2 border rounded-md"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                    Sign In
                </button>
            </form>

            <p className="mt-4 text-center">
                Need an Account? <br />
                <span className="block mt-2">
                    <Link to="/register" className="text-blue-500 underline">
                        Sign Up
                    </Link>
                </span>
            </p>
        </section>
    )
}

export default Login