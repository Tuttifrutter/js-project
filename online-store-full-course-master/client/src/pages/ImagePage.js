import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import handUp from '../assets/handup.png'
import handDown from '../assets/handdown.png'
import {useParams} from 'react-router-dom'
import {fetchOneImage, getComments, dataParse} from "../http/imageAPI";
import {Context} from "../index";
import CommentList from '../components/CommentList';
import CommentAddForm from '../components/CommentAddForm';
import { observer } from 'mobx-react-lite';

const ImagePage  = observer(() => {
    const [imagel, setImage] = useState({info: []})
    const {id} = useParams()
    const {image} = useContext(Context)

    useEffect(() => {
        fetchOneImage(id).then(data => setImage(data));
        getComments(id).then(data => image.setComments(data));
        localStorage.setItem("ChoosenImgId",id);
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={7}>
                    <Image width={600} height={600} src={process.env.REACT_APP_API_URL + imagel.img}/>
                </Col>
                <Col md={1}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>LIKE</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${handUp}) no-repeat center center`, width:150, height: 150, backgroundSize: 'cover', fontSize:56, color: 'black'}}
                        ><div style = {{marginTop: 30, marginLeft: 30}}>{imagel.like_count}</div>
                            
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>DISLIKE</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${handDown}) no-repeat center center`, width:150, height: 150, backgroundSize: 'cover', fontSize:56, color: 'black'}}
                        >
                           <div style = {{marginBottom: 50, marginRight: 30}}> {imagel.dislike_count}</div>
                        </div>
                    </Row>
                    <h1></h1>
                    <Row><h5><div>{imagel.text}</div></h5></Row>
                    
                </Col>
                
            </Row>
            <h7>{dataParse(imagel.createdAt)}</h7>
            <Col md={2}>
            <h2>COMMENTS</h2>   
                <CommentAddForm/>
                <h1></h1>   
                    <CommentList/>
            </Col>
        </Container>
    );
})

export default ImagePage;
