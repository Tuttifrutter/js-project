import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import styles from "./Main/Card.module.css"
import {useHistory} from "react-router-dom"
import {IMAGE_ROUTE, USERPAGE_ROUTE} from "../utils/consts";
import {dis_like} from "../http/imageAPI";
import { getImgNick } from '../http/imageAPI';

const ImageItem = ({image, user}) => {
    const history = useHistory()
    return (
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card__header} >
                <Image id = {"userImg"+image.id} className={styles.Card__userLogo} onClick={(event) => {localStorage.setItem("choosenUserId", image.userId);  history.push(USERPAGE_ROUTE + '/' + image.userId)}} />
                <div clasName={styles.Card_userDate}>
                    <div id = {"nickName"+image.id}className={styles.Card__userName}>{getImgNick(image.id, "imgUserInfo")} </div>
                    <div className={styles.Card__userPosition}>{image.location}</div>
                </div>
                <div className={styles.Card__burger}>
                . . .
                </div>
            </div>
            <Col md={-3} onClick={(event) => {history.push(IMAGE_ROUTE + '/' + image.id)}}>
            <div className={styles.Card__content}><Image width={614} height={614} src={process.env.REACT_APP_API_URL + image.img}/></div>
            </Col>
            <div className={styles.Card__communication}>
        
                <span id = {"lbtn"+image.id}  onClick={ like =>{dis_like(image.id, localStorage.getItem('userId'), '1'); }}>
                <a class="material-icons">thumb_up </a>                  
                                                         
                </span>
                  
                <span id = {"likeNum"+image.id}>{image.like_count}</span>
                <span id = {"dbtn"+image.id} onClick={dislike => {dis_like(image.id, localStorage.getItem('userId'), '0'); }}>
                <a class="material-icons">thumb_down </a>
                </span>
                <span id={"dislikeNum"+image.id}>{image.dislike_count}</span>    
                  
                <span class="material-icons" onClick={(event) => {history.push(IMAGE_ROUTE + '/' + image.id)}}>
                    comment
                </span>
                <span>{image.comment_count}</span> 
                <div>{image.text}</div>
            </div>
        </div>
    </Card>
        
    );
};

export default ImageItem;
