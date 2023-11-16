// UserInfo.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const USER_INFO_URL = "/api/user/personal-data"

const UserInfo = () => {
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserData] = useState({
        userEmail: '',
        firstName: '',
        lastName: '',
        patronymic: '',
        password: ''
    });


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchUserData = async () => {
            try {
                const response = await axiosPrivate.get(USER_INFO_URL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUserData(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post('endpoint for changing credential', userData);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <Link to="/main-u" className="absolute left-4 top-4 bg-blue-500 px-4 py-2 text-white rounded">
                Come back
            </Link>

            <h1 className="text-4xl text-center mb-8">User Info</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" value={userData.userEmail} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName">First name: </label>
                    <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName">Last name: </label>
                    <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="patronymic">Patronymic: </label>
                    <input type="text" id="patronymic" name="patronymic" value={userData.patronymic} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" id="newPassword" name="newPassword" value={userData.newPassword} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                </div> */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </form>
        </div>
    );
}

export default UserInfo;
