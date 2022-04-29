import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import {NavLink} from "react-router-dom";
import styles from "./Notification/Card.module.css"
import { Image } from 'react-bootstrap';
import { USERPAGE_ROUTE, IMAGE_ROUTE } from '../utils/consts';
import { getComImgNick, dataParse, deleteNotification } from '../http/imageAPI';

const NotificationItem = ({notific}) => {
    const history = useHistory()
    const nt = [
        { key: 1, type: "rating_notification", text: " оценил Вашу ", link: IMAGE_ROUTE + '/' + notific.infoId, title: "запись"},
        { key: 2, type: "comment_notification", text: " оставил комментарий под Вашей ", link: IMAGE_ROUTE + '/' + notific.infoId, title: "записью"},
        { key: 3, type: "subscribe_notification", text: " подписался на Вас", link: "", title: "" }
    ]

    return (
            <div onClick={() => deleteNotification(notific.id)}><Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card_header}>
            <Image id = {"userImg"+notific.id} className={styles.Card__userLogo} onClick={(event) => {localStorage.setItem("choosenUserId", notific.userId_from);  history.push(USERPAGE_ROUTE + '/' + notific.userId_from)}}/>
            <div clasName={styles.Card_userDate}>
                    <div id = {"nickName"+notific.id} className={styles.Card__userName}>{getComImgNick(notific.id, "notificUserInfo")} </div> 
                    
                    <div className={styles.Card__userPosition}><div >{nt[notific.notific_type-1].text}<NavLink to={nt[notific.notific_type-1].link}>{nt[notific.notific_type-1].title}</NavLink></div>{dataParse(notific.createdAt)}</div>
                </div>
            </div>

            <div className={styles.Card__communication}>
                
            </div>
        </div>
    </Card></div>
        
    );
};

export default NotificationItem;
