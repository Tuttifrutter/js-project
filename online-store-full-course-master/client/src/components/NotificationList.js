import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import { userInfo } from '../http/userAPI';

const NotificationList = observer(() => {
    const {image} = useContext(Context);
    
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
});

export default NotificationList;