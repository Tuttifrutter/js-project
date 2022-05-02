import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import styles from "./SearchUserItemStyle/Card.module.css"
import { Image } from 'react-bootstrap';
import { USERPAGE_ROUTE } from '../utils/consts';
import { getImgNick, dataParse } from '../http/imageAPI';
import { subButton, subscribe, subscribeOrNot } from '../http/userAPI';

const UserInfoItem = ({user}) => {
    const history = useHistory()
    const myuserId = localStorage.getItem("userId")

    return (  
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"} onClick={(event) => {
                localStorage.setItem("choosenUserId", user.id);  history.push(USERPAGE_ROUTE + '/' + user.id)
                var dropdowns = document.getElementsByClassName(styles.dropdown_content);
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                  var openDropdown = dropdowns[i];
                  if (openDropdown.classList.contains(styles.show)) {
                    openDropdown.classList.remove(styles.show);
                  }
                }
                }}>
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
                <div></div>
                   
            </div>
            <div className={styles.Card__status}>{user.status=="online"? user.status : "заходил "+ dataParse(user.status, false)}</div>
            </div>
            </div>
        </div>
    </Card>
        
    );
};

export default UserInfoItem;
