import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ClickedImage from '../components/ClickedImage';
import ImageCard from '../components/ImageCard';

const URL_IMAGE_LIST = 'api/image/all/public';

const Home = () => {
    const [clickedImage, setClickedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    const [images, setImages] = useState([]);
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
    }, []);

    const handleSelectImage = image => {
        setClickedImage(image);
        console.log(image);
    }

    const handleClick = (image, index) => {
        setCurrentIndex(index);
        setClickedImage(image.imageData);
    };



    return (
        <div className="container mx-auto">
            <Link to="/login" className="absolute right-3 top-4 bg-blue-500 px-4 py-2 text-white rounded">
                Sign in
            </Link>
            <Link to="/register" className="absolute right-2 top-20 bg-blue-500 px-4 py-2 text-white rounded">
                Sign up
            </Link>

            {
                images && images.map(image => (
                    <ImageCard
                        image={image}
                        onSelect={handleSelectImage}
                        key={image.name}
                    />
                ))
            }

            {
                !isLoading && images.length === 0 &&
                <h1 className="text-5xl text-center mx-auto mt-32">
                    No Images Found
                </h1>
            }

            {
                isLoading
                    ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
                    : <div className="grid grid-cols-3 gap-4">
                        {
                            clickedImage && (
                                <ClickedImage images={images} clicked_Image={clickedImage} current_index={currentIndex} />
                            )
                        }
                    </div>
            }


        </div>
    );
}

export default Home