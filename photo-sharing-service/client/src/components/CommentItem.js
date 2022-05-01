import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import styles from "./Comment/Card.module.css"
import { Image } from 'react-bootstrap';
import { USERPAGE_ROUTE } from '../utils/consts';
import { getComImgNick, dataParse } from '../http/imageAPI';

const CommentItem = ({comment}) => {
    const history = useHistory();
    getComImgNick(comment.id, "comUserInfo");

    return (
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card_header}>
            <Image id = {"userImg"+comment.id} className={styles.Card__userLogo} onClick={(event) => {localStorage.setItem("choosenUserId", comment.userId);  history.push(USERPAGE_ROUTE + '/' + comment.userId)}}/>
            <div clasName={styles.Card_userDate}>
                    <div id = {"nickName"+comment.id}className={styles.Card__userName}>{} </div>
                    <div className={styles.Card__userPosition}>{dataParse(comment.createdAt)}</div>
                </div>
            <div className={styles.Card__burger}>
                . . .
                </div>
            </div>

            <div className={styles.Card__communication}>
                <div>{comment.text}</div>
            </div>
        </div>
    </Card>
        
    );
};

export default CommentItem;
