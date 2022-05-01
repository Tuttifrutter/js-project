import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ImageItem from "./ImageItem";
import { userInfo} from "../http/userAPI.js"


const ImageList = observer(() => {
    const {image} = useContext(Context);
    
    return (
        <Row className="d-flex">
            {
            image.images.map(image =>
                <ImageItem key={image.id} image={image} user={
                userInfo(image.userId).then(data =>localStorage.setItem("imgUserInfo"+image.id, data))
                }/>
            )
            }
        </Row>
    );
});

export default ImageList;