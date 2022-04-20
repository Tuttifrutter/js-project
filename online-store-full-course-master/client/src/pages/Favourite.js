import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThemeBar from "../components/ThemeBar";
import ImageList from "../components/ImageList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchThemes, getLikeList, fetchOneImage} from "../http/imageAPI";

const Favourite = observer(() => {
    const {image} = useContext(Context)
    let userId = localStorage.getItem("userId");
    useEffect(() => {
        fetchThemes().then(data => image.setThemes(data))
        let imgList=[];
        image.clearImages();
        getLikeList(userId).then(data =>{
            for(let i=data.length-1; i>=0; i--){
                fetchOneImage(data[i]).then(result => {image.addImage(result)})
            }
            
        })
    }, [])



    return (
        <Container>
            <Row className="mt-3">
                <Col md={2}>
                    <h2>ПОНРАВИВШИЕСЯ:</h2>
                    <ImageList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Favourite;
