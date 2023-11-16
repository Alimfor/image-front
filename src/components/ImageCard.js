import { Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ImageCard = ({ image, onSelect }) => {
    const cardStyle = {
        width: '300px',
        margin: '16px',
    };

    return (
        <Card
            hoverable
            style={cardStyle}
            cover={
                <img
                    alt="Picture is not found"
                    src={`data:image/png;base64,${image.imageData}`}
                    onClick={() => onSelect(image)}
                />
            }
            actions={[
                <EyeOutlined key="view" onClick={() => onSelect(image)} />,
            ]}
        >
            <Meta title={image.name} ellipsis={{ rows: 1, expandable: false }} />
        </Card>
    );
};

export default ImageCard;
