import React, { useState } from 'react';
import Modal from './Modal';

const ClickedImage = ({ images, clicked_Image, current_index }) => {
    const [clickedImage, setClickedImage] = useState(clicked_Image);
    const [currentIndex, setCurrentIndex] = useState(current_index);

    const handleRotationRight = () => {
        const totalLength = images.length;
        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
            const newUrl = images[0];
            setClickedImage(newUrl);
            return;
        }

        const newIndex = currentIndex + 1;
        const newUrl = images.filter(item => {
            return images.indexOf(item) === newIndex;
        });

        const newItem = newUrl[0];
        setClickedImage(newItem);
        setCurrentIndex(newIndex);
    }

    const handleRotationLeft = () => {
        const totalLength = images.length;

        if (currentIndex === 0) {
            setCurrentIndex(totalLength - 1);
            const newUrl = images[totalLength - 1];
            setClickedImage(newUrl);
            return;
        }

        const newIndex = currentIndex - 1;
        const newUrl = images.filter(item => {
            return images.indexOf(item) === newIndex;
        });

        const newItem = newUrl[0];
        setClickedImage(newItem);
        setCurrentIndex(newIndex);
    }

    return (
        <div>
            {clickedImage &&
                <Modal
                    clickedImage={clickedImage}
                    handleRotationRight={handleRotationRight}
                    setClickedImage={setClickedImage}
                    handleRotationLeft={handleRotationLeft}
                />
            }
        </div>
    )
}

export default ClickedImage