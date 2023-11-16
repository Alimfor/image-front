import { useState } from 'react';
import '../assets/uploader.css';
import { Button, Upload, message, Space } from 'antd';
import { InboxOutlined, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

const Uploader = () => {
    const { Dragger } = Upload;
    const axiosPrivate = useAxiosPrivate();
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState("No selected file");
    const [file, setFile] = useState();

    const props = {
        beforeUpload: (file) => {
            handleFileChange({ target: { files: [file] } });
            return false;
        },
    };

    const handleFileChange = ({ target: { files } }) => {
        if (files && files[0]) {
            setFileName(files[0].name);
            setImage(URL.createObjectURL(files[0]));
            setFile(files[0]);
        }
    };

    const handleDeleteImage = () => {
        setFileName('No selected file');
        setImage(null);
    };

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            await axiosPrivate.post('api/image/new', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <main className="upload">
            <Link to="/main" className="absolute left-4 top-4 bg-blue-500 px-4 py-2 text-white rounded">
                Come back
            </Link>
            <Space direction="vertical" align="center" style={{ width: '500px' }}>
                <Link to="/" className="absolute right-20 top-4">
                    <Button type="primary">Come back</Button>
                </Link>

                <Upload {...props} accept="image/*" className="input-field" showUploadList={false}>
                    <div className="upload-container">
                        {image ? (
                            <img src={image} width={150} height={150} alt={fileName} />
                        ) : (
                            <>
                                <CloudUploadOutlined style={{ fontSize: '60px', color: '#1475cf' }} />
                                <p>Browse Files to upload</p>
                            </>
                        )}
                    </div>
                </Upload>

                <section className="uploaded-row">
                    <Space>
                        <DeleteOutlined
                            onClick={() => {
                                setFileName('No selected File');
                                setImage(null);
                            }}
                        />
                        <div className="uploaded-content">{fileName}</div>
                    </Space>
                </section>

                {/* Add the submit button here */}
                <Button
                    type="primary"
                    onClick={uploadImage}
                    disabled={!image}
                >
                    Submit Image
                </Button>
            </Space>
        </main>
    );
};

export default Uploader