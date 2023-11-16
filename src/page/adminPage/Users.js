import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Button, Space } from 'antd';

const URL_USER_LIST = '/api/admin/user-list';

const Users = () => {
    const columns = [
        {
            title: 'Person ID',
            dataIndex: 'personId',
            key: 'personId',
        },
        {
            title: 'User Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Patronymic',
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Lock',
            key: 'lock',
            render: (_, record) => (
                <Button onClick={() => handleLock(record.personId)}>
                    {record.locked ? 'Unlock' : 'Lock'}
                </Button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_, record) => (
                <Button onClick={() => handleDelete(record.personId)} danger>
                    Delete
                </Button>
            ),
        }
    ];


    const [users, setUsers] = useState();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(URL_USER_LIST, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, location, navigate])

    const handleLock = (userId) => {
        console.log(`Lock user with ID ${userId}`);
    };

    const handleDelete = (userId) => {
        console.log(`Delete user with ID ${userId}`);
    };

    return (
        <article>
            <h2>Users List</h2>
            <Table
                dataSource={users}
                columns={columns}
                pagination={{ pageSize: 10 }}
            />
        </article>
    );
};

export default Users;
