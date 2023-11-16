import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ImageCard from '../../components/ImageCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from '../../components/SearchBar';
import ImageDetail from '../../components/ImageDetail';

const URL_IMAGE_INFO = 'api/image/all/private';

const User = () => {
    const { Header, Content } = Layout;
    const axiosPrivate = useAxiosPrivate();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getImageInfo = async () => {
            try {
                const response = await axiosPrivate.get(URL_IMAGE_INFO, {
                    signal: controller.signal
                });
                isMounted && setImages(response.data);
                setIsLoading(false);
            } catch (error) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getImageInfo();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleSelectImage = image => {
        setSelectedImage(image);
    }

    const handleClearSelection = () => {
        setSelectedImage(null);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Menu mode="horizontal" theme="light">
                    <Menu.Item key="upload">
                        <Link to="/upload-p">Upload Image</Link>
                    </Menu.Item>
                    <Menu.Item key="userinfo">
                        <Link to="/userinfo">UserInfo</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '24px' }}>
                <div className="container mx-auto">
                    <div>
                        <SearchBar data={images} onSearch={handleSelectImage} getAll={handleClearSelection} />
                    </div>
                    {!isLoading && images.length === 0 && (
                        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
                    )}
                    {isLoading ? (
                        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
                    ) : selectedImage ? (
                        <ImageDetail image={selectedImage} onBack={handleClearSelection} />
                    ) : (
                        <div className="user-grid grid grid-cols-3 gap-4">
                            {images.map((image) => (
                                <ImageCard image={image} onSelect={handleSelectImage} key={image.name} />
                            ))}
                        </div>
                    )}
                </div>
            </Content>
        </Layout>
    );
}

export default User