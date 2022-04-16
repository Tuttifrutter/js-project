import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import styles from "./Comment/Card.module.css"
import { Image } from 'react-bootstrap';
import {getUserProfile, sendComment} from '../http/imageAPI';
import { USERPAGE_ROUTE } from '../utils/consts';
const CommentAddForm = () => {
    const history = useHistory()
    const userId = localStorage.getItem("userId");
    return (
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card_header}>
            <Image id = {"addComUserImg"} className={styles.Card__userLogo} onClick={(event) => {localStorage.setItem("choosenUserId", userId);  history.push(USERPAGE_ROUTE + '/' + userId)}}/>
            <div clasName={styles.Card_userDate}>
                    <div id = {"addComUserNick"}className={styles.Card__userName}>{} </div>
                    <div className={styles.Card__userPosition}>{getUserProfile("addComUserNick","addComUserImg")}</div>
                </div>
            <div className={styles.Card__burger}>
                . . .
                </div>
            </div>

            <div className={styles.Card__communication}>
                <div><textarea id ="input" type="text" placeholder="Введите свой комментарий" className={styles.Сomment__add}/></div>
            </div>
            <div ><Button className={styles.Comment__btn} onClick={()=>sendComment(localStorage.getItem("ChoosenImgId"), localStorage.getItem("userId"))}>SEND</Button></div>

        </div>
    </Card>
            
            
    );
};

export default CommentAddForm;
