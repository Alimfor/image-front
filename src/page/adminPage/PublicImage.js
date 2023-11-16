import React, { useEffect, useState } from 'react'
// import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from '../../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageCard from '../../components/ImageCard';
import ClickedImage from '../../components/ClickedImage';

const URL_IMAGE_LIST = 'api/image/all/public';

const PublicImage = () => {
    const { Header, Content } = Layout;
    const [clickedImage, setClickedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [images, setImages] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const getImages = async () => {
            try {
                const response = await axios.get(URL_IMAGE_LIST);
                setImages(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                navigate(
                    '/login',
                    {
                        state: { from: location },
                        replace: true
                    }
                )
            }
        }

        getImages();
    }, [location, navigate]);

    const handleSelectImage = image => {
        setClickedImage(image);
    }

    const handleClick = (image, index) => {
        setCurrentIndex(index);
        setClickedImage(image.imageData);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Menu mode="horizontal" theme="light">
                    <Menu.Item key="upload">
                        <Link to="/upload">Upload Image</Link>
                    </Menu.Item>
                    <Menu.Item key="image-table">
                        <Link to="/image-table">Image Table</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '24px' }}>
                {
                    images && images.length > 0 && (
                        <div className="public-grid grid-cols-3 gap-4">
                            {images.map((image) => (
                                <ImageCard
                                    image={image}
                                    onSelect={handleSelectImage}
                                    key={image.name}
                                />
                            ))}
                        </div>
                    )
                }
                {
                    !isLoading && images.length === 0 && (
                        <h1 className="text-5xl text-center mx-auto mt-32">
                            No Images Found
                        </h1>
                    )
                }
                {
                    isLoading ? (
                        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
                    ) : (
                        clickedImage && (
                            <ClickedImage images={images} clickedImage={clickedImage} currentIndex={currentIndex} />
                        )
                    )
                }
            </Content>
        </Layout>
    )
}

export default PublicImage