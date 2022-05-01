import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FriendBar from "../components/FriendBar";
import ThemeBar from "../components/ThemeBar";
import ImageList from "../components/ImageList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchThemes, fetchImages} from "../http/imageAPI";
import {getSubscribesName} from "../http/userAPI";
import Pages from "../components/Pages";

const Gallery = observer(() => {
    const {image} = useContext(Context)
    useEffect(() => {
        getSubscribesName(localStorage.getItem("userId")).then(data => image.setFriends(data.data));
        fetchThemes().then(data => image.setThemes(data))
        fetchImages(null, null, 1, null, 2).then(data => {
            image.setImages(data.rows)
            image.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        console.log(image.selectedFriend.id);
        fetchImages(image.selectedFriend.id, image.selectedTheme.id, image.page,null, 2).then(data => {
            image.setImages(data.rows)
            image.setTotalCount(data.count)
        })
    }, [image.page, image.selectedFriend, image.selectedTheme,])



    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <FriendBar/>
                </Col>
                <Col md={2}>
                    <ThemeBar/>
                    <ImageList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Gallery;
