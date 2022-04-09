import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CommentItem from "./CommentItem.js";
import { getComments } from '../http/imageAPI';
import { userInfo } from '../http/userAPI';

const CommentList = observer(() => {
    const {image} = useContext(Context);
    
    return (
        <Row className="d-flex">
            {
            image.comments.map(comment =>
                <CommentItem key={comment.id} comment={comment} user={
                    userInfo(comment.userId).then(data =>localStorage.setItem("comUserInfo"+comment.id, data))}/>
            )
            }
        </Row>
    );
});

export default CommentList;