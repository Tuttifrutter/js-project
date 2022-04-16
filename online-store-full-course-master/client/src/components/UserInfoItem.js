import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import styles from "./UserInfo/Card.module.css"
import { Image } from 'react-bootstrap';
//import {dis_like} from "../http/imageAPI";
//getImgNick(comment.id, "comUserInfo")
//dataParse(comment.createdAt)
import { getImgNick, dataParse } from '../http/imageAPI';

const UserInfoItem = ({user}) => {
    const history = useHistory()
    return (  
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
            <div className={styles.Card}>
            <div className={styles.Card__border}>
            <div className={styles.Card_header}>
            <Image id = {"userImg"} className={styles.Card__userLogo} src={process.env.REACT_APP_API_URL + user.img}/>
            <div className={styles.Card_userDate}>
                    <div id = {"nickName"}className={styles.Card__userName}>{user.nick_name} </div> 
                    <div className={styles.Card__userPosition}>{user.first_name+" "+user.second_name}</div>
                </div>
                <div className={styles.Card__communication}>
                <div>{user.email}</div>
                <div><Button className={styles.Subscribe__btn}>Подписаться</Button></div>
            </div>
            <div className={styles.Card__status}>{"Статус: "+ user.status}</div>
            </div>
            </div>
        </div>
    </Card>
        
    );
};

export default UserInfoItem;
