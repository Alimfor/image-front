import React from 'react';
import { Button, Descriptions } from 'antd';

function ImageDetail({ image, onBack }) {
    return (
        <div>
            <Button type="primary" onClick={onBack} style={{ marginBottom: '16px' }}>
                Go back
            </Button>
            <h2>Image details</h2>
            <img src={`data:image/png;base64,${image.imageData}`} alt={image.name} />
            <Descriptions title="Image Info" bordered column={1}>
                <Descriptions.Item label="Image Name">{image.name}</Descriptions.Item>
                {/* Add more image details as needed */}
            </Descriptions>
        </div>
    );
}

export default ImageDetail;
