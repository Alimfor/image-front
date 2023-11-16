import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";

const URL_VALIDATE_PASSWORD = '/api/admin/validate';
const URL_SWITCH_ROLE = '/api/admin/switch_to';

function SwitchRole() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [error, setError] = useState(null);

    const validatePassword = async (e) => {
        console.log(password);
        try {
            const response = await axiosPrivate.post(
                URL_VALIDATE_PASSWORD,
                { actualPassword: password }
            );

            if (response.status === 200) {
                const result = response.data['Is valid'];

                setIsValid(result);
                if (!result) {
                    setError('Invalid password. Please try again.');
                }
            } else {
                setError('Error validating password. Please try again.');
            }
        } catch (error) {
            console.error('Error validating password:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const switchRole = async (e) => {

        try {
            const response = await axiosPrivate.patch(
                URL_SWITCH_ROLE + `?newRole=${newRole}`
            );
            if (response.status === 200 || response.status === 204) {
                navigate(
                    '/login',
                    {
                        state: { from: location },
                        replace: true
                    }
                );
            } else {
                setError('Error switching role. Please try again.');
            }
        } catch (error) {
            console.error('Error switching role:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNewRole('ROLE_ADMIN');

        // Reset previous state
        setIsValid(null);
        setError(null);

        // Validate password
        await validatePassword();

        // If password is valid, switch the role
        if (isValid) {
            await switchRole();
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white border rounded shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Enter Security Password:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Validate Password
                    </button>
                </div>
            </form>

            {isValid !== null && isValid ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Select New Role:
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                required
                            >
                                <option value="ROLE_ADMIN">Admin</option>
                                <option value="ROLE_USER">User</option>
                            </select>
                        </label>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={switchRole}
                    >
                        Switch Role
                    </button>
                </div>
            ) : (
                <div>{error && <p className="text-red-500">{error}</p>}</div>
            )}
        </div>
    );
}

export default SwitchRole;
