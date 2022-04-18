import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserInfoItem from '../components/UserInfoItem';
import ThemeBar from "../components/ThemeBar";
import ImageList from "../components/ImageList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchThemes, fetchImages} from "../http/imageAPI";
import Pages from "../components/Pages";
import { getUserInfo, subscribeOrNot, subButton } from '../http/userAPI';

const UserPage = observer(() => {
    const {image} = useContext(Context)
    let user = image.getUserInfo
    useEffect(() => {
        const userId = localStorage.getItem("choosenUserId");
        fetchThemes().then(data => image.setThemes(data))
        getUserInfo(userId).then(data => image.setUserInfo(data))
        fetchImages(null, null, 1, userId, 2).then(data => {
            image.setImages(data.rows)
            image.setTotalCount(data.count)
        })
        user = image.getUserInfo;
        const authId = localStorage.getItem("userId");
        if(authId != userId){
            subscribeOrNot(authId, userId).then(data=>{subButton(data)});
        }else {
            subButton("*");
        }


    }, [])

    useEffect(() => {
        const userId = localStorage.getItem("choosenUserId");
        fetchImages(null, image.selectedTheme.id, image.page,userId, 2).then(data => {
            image.setImages(data.rows)
            image.setTotalCount(data.count)
        })
    }, [image.page, image.selectedFriend, image.selectedTheme,])



    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <UserInfoItem user ={user}/>
                    <ThemeBar/>
                    <ImageList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default UserPage;
