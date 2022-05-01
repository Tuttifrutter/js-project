import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import { userInfo } from '../http/userAPI';

const NotificationList = observer(() => {
    const {image} = useContext(Context);
    if(image.notifications.length != 0){
        return (
            <Row className="d-flex">
                {
                image.notifications.map(notific =>
                    <NotificationItem key={notific.id} notific={notific} user={
                        userInfo(notific.userId_from).then(data =>localStorage.setItem("notificUserInfo"+notific.id, data))}/>
                )
                }
            </Row>
        );
    } else {
        return (
        <h7>{"У Вас нет новых уведомлений"}</h7>
        );
    }

});

export default NotificationList;