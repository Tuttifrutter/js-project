import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ImageItem from "./ImageItem";

const ImageList = observer(() => {
    const {image, user} = useContext(Context)

    return (
        <Row className="d-flex">
            {image.images.map(image =>
                <ImageItem key={image.id} image={image} user ={user}/>
            )}
        </Row>
    );
});

export default ImageList;
