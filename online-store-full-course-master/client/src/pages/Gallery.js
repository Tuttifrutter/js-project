import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FriendBar from "../components/FriendBar";
import ThemeBar from "../components/ThemeBar";
import ImageList from "../components/ImageList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchThemes, fetchImages, fetchFriends} from "../http/imageAPI";
import Pages from "../components/Pages";

const Gallery = observer(() => {
    const {image} = useContext(Context)

    useEffect(() => {
        fetchFriends().then(data => image.setFriends(data))
        fetchThemes().then(data => image.setThemes(data))
        fetchImages(null, null, 1, 2).then(data => {
            image.setImages(data.rows)
            image.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchImages(image.selectedFriend.id, image.selectedTheme.id, image.page, 2).then(data => {
            image.setImages(data.rows)
            image.setTotalCount(data.count)
        })
    }, [image.page, image.selectedFriend, image.selectedTheme,])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={9}>
                    <FriendBar/>
                </Col>
                <Col md={9}>
                    <ThemeBar/>
                    <ImageList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Gallery;
