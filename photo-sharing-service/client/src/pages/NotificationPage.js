import React, {useEffect, useState, useContext} from 'react';
import {Col, Container} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {getNotifications} from "../http/imageAPI";
import {Context} from "../index";
import NotificationList from '../components/NotificationList';
import { observer } from 'mobx-react-lite';

const NotificationPage  = observer(() => {
    const id = localStorage.getItem("userId");
    const {image} = useContext(Context)

    useEffect(() => {
        console.log(id)
        getNotifications(id).then(data => image.setNotifications(data));
    }, [])

    return (
        <Container className="mt-3">
            <Col md={2}>
            <h2>NOTIFICATION</h2>   
                <h1></h1>   
                    <NotificationList/>
            </Col>
        </Container>
    );
})

export default NotificationPage;
