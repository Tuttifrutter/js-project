import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneImage} from "../http/imageAPI";

const ImagePage = () => {
    const [image, setImage] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneImage(id).then(data => setImage(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + image.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{image.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:24, height: 24, backgroundSize: 'cover', fontSize:64}}
                        >
                            {image.like_count}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{image.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:24, height: 24, backgroundSize: 'cover', fontSize:64}}
                        >
                            {image.dislike_count}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ImagePage;
