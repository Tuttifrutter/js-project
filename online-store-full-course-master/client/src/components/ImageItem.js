import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import styles from "./Main/Card.module.css"
import {useHistory} from "react-router-dom"
import {IMAGE_ROUTE} from "../utils/consts";

const ImageItem = ({image}) => {
    const history = useHistory()
    return (
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card__header}>
                <div className={styles.Card__userLogo}></div>
                <div clasName={styles.Card_userDate}>
                    <div className={styles.Card__userName}>{image.name}</div>
                    <div className={styles.Card__userPosition}>{image.location}</div>
                </div>
                <div className={styles.Card__burger}>
                . . .
                </div>
            </div>
            <Col md={-3} onClick={() => history.push(IMAGE_ROUTE + '/' + image.id)}>
            <div className={styles.Card__content}><Image width={614} height={614} src={process.env.REACT_APP_API_URL + image.img}/></div>
            </Col>
            <div className={styles.Card__communication}>
                <span class="material-icons">
                  favorite
                </span>
                <span>{image.like_count}</span>
                <span class="material-icons">
                  favorite
                </span>
                <span>{image.dislike_count}</span>      
                <span class="material-icons">
                    send
                </span>
                <span>0</span> 
                <div>{image.text}</div>
            </div>
        </div>
    </Card>
        
    );
};

export default ImageItem;
