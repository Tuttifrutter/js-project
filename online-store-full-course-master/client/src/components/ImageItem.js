import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import styles from "./Main/Card.module.css"
import {useHistory} from "react-router-dom"
import {IMAGE_ROUTE} from "../utils/consts";
import {dis_like} from "../http/imageAPI";

const ImageItem = ({image, user}) => {
    const history = useHistory()
    return (
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card__header}>
                <div className={styles.Card__userLogo}></div>
                <div clasName={styles.Card_userDate}>
                    <div className={styles.Card__userName}>{localStorage.getItem('userName')}</div>
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
        
                <span id = "btn"  onClick={ like =>{dis_like(image.id, localStorage.getItem('userId'), '1');
                                                                            var btn = document.getElementById("btn");
                                                                            if(btn.classList.contains("likeBtn")){
                                                                                btn.classList.remove("likeBtn") 
                                                                            }else{
                                                                                btn.classList.add("likeBtn")
                                                                            }
                                                                            window.location.reload();
                                                                            }}>
                <a class="material-icons">thumb_up </a>                                                               
                </span>
                  
                <span>{image.like_count}</span>
                <span id = "btn2" onClick={dislike => {dis_like(image.id, localStorage.getItem('userId'), '0');
                                                                var btn = document.getElementById("btn2");
                                                                if(btn.classList.contains("dislikeBtn")){
                                                                    btn.classList.remove("dislikeBtn") 
                                                                }else{
                                                                    btn.classList.add("dislikeBtn")
                                                                }
                                                                window.location.reload();
                                                                }}>
                <a class="material-icons">thumb_down </a>
                </span>
                <span onTimeUpdate={1}>{image.dislike_count}</span>    
                  
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
