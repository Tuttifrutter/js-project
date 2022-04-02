import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const FriendBar = observer(() => {
    const {image} = useContext(Context)
    return (      
        <ListGroup>                             
            {image.friends.map(friend =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={friend.id === image.selectedFriend.id}
                    onClick={() => image.setSelectedFriend(friend)}
                    key={friend.id}
                >
                    {friend.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default FriendBar;
