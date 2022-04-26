import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import styles from "./Comment/Card.module.css"
import { Image } from 'react-bootstrap';
import { USERPAGE_ROUTE } from '../utils/consts';
import { getImgNick, dataParse } from '../http/imageAPI';

const NotificationItem = ({notific}) => {
    const history = useHistory()
    const notifications_types = [
        { key: 1, type: "rating_notification", text: " оценил Вашу запись" },
        { key: 2, type: "comment_notification", text: " оставил комментарий под Вашей записью" },
        { key: 3, type: "subscribe_notification", text: " подписался на Вас" }
    ]

    return (
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card_header}>
            <Image id = {"userImg"+notific.id} className={styles.Card__userLogo} onClick={(event) => {localStorage.setItem("choosenUserId", notific.userId_from);  history.push(USERPAGE_ROUTE + '/' + notific.userId_from)}}/>
            <div clasName={styles.Card_userDate}>
                    <div id = {"nickName"+notific.id} className={styles.Card__userName}>{getImgNick(notific.id, "notificUserInfo")} </div>
                    <div className={styles.Card__userPosition}>{dataParse(notific.createdAt)}</div>
                </div>
            <div className={styles.Card__burger}>
                . . .
                </div>
            </div>

            <div className={styles.Card__communication}>
                <div><h4>{notifications_types[notific.notific_type-1].text}</h4></div>
            </div>
        </div>
    </Card>
        
    );
};

export default NotificationItem;
