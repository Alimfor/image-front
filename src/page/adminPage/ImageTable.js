import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Table, Modal, Button, Input } from 'antd';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';



const URL_GET_ALL_PUBLIC = 'api/image/all/public';
const URL_PATCH_IMAGE_BY_NAME = 'api/image/rename';
const URL_DELETE_IMAGE__BY_NAME = 'api/image/delete/';

const ImageTable = () => {
    const columns = [
        {
            title: 'Image Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Image Preview',
            key: 'imageData',
            render: (_, record) => (
                <img
                    src={URL.createObjectURL(new Blob([record.imageData], { type: record.type }))}
                    alt={record.name}
                    style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: '100px' }}
                    onClick={() => {
                        setClickedImage(record);
                        setIsModalOpen(true);
                    }}
                />
            ),
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (_, record) => (
                <Button onClick={() => handleEdit(record.name)} >
                    Edit
                </Button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_, record) => {
                setOldImageName(record.name);
                return <>
                    <Button onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </>
            }
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [images, setImages] = useState([]);
    const [oldImageName, setOldImageName] = useState('');
    const [newImageName, setNewImageName] = useState('');
    const [clickedImage, setClickedImage] = useState({ name: '', type: '', imageData: [] });

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axios.get(URL_GET_ALL_PUBLIC, {
                signal: controller.signal
            });
            isMounted && setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const handleEdit = (imageName) => {
        console.log(imageName);
        setOldImageName(imageName);
        setIsEditModalVisible(true);
    };

    const handleEditModalOk = () => {
        const controller = new AbortController();

        const path = async () => {
            try {
                const response = await axiosPrivate.patch(URL_PATCH_IMAGE_BY_NAME,
                    {
                        oldName: oldImageName,
                        newName: newImageName
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                        signal: controller.signal
                    }
                );
                console.log(response.status);
                if (response.status === 204) {
                    handleFetchData();
                }
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        path();
        return () => {
            controller.abort();
        }
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleDelete = async () => {
        console.log(axiosPrivate);
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.delete(URL_DELETE_IMAGE__BY_NAME + oldImageName,
                {
                    signal: controller.signal
                }
            );
            console.log(response);
            if (response.status === 204) {
                handleFetchData();
            }
        } catch (err) {
            console.error('Error fetching images:', err);
        }

        return () => {
            controller.abort()
        };
    };

    return (
        <div>
            <h2>Image Table</h2>
            <Table dataSource={images} columns={columns} />

            <Modal
                open={isModalOpen}
                title={clickedImage.name}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <img
                    src={`data:image/png;base64,${clickedImage.imageData}`}
                    alt={clickedImage.name}
                    style={{ maxWidth: '100%' }}
                />
            </Modal>

            <Modal
                title="Edit Image"
                open={isEditModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                <label htmlFor="editedImageName">Image Name:</label>
                <Input
                    id="editedImageName"
                    value={newImageName}
                    onChange={(e) => setNewImageName(e.target.value)}
                />
            </Modal>
        </div >
    );
}

export default ImageTable