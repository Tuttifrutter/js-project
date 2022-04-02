import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateTheme from "../components/modals/AddTheme";
import CreateImage from "../components/modals/CreatePost";
import CreateFriend from "../components/modals/AddFriend";

const Admin = () => {
    const [themeVisible, setThemeVisible] = useState(false)
    const [friendVisible, setFriendVisible] = useState(false)
    const [imageVisible, setImageVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setFriendVisible(true)}
            >
                Добавить друга
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setThemeVisible(true)}
            >
                Добавить тему
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setImageVisible(true)}
            >
                Добавить изоображение
            </Button>
            <CreateTheme show={themeVisible} onHide={() => setThemeVisible(false)}/>
            <CreateImage show={imageVisible} onHide={() => setImageVisible(false)}/>
            <CreateFriend show={friendVisible} onHide={() => setFriendVisible(false)}/>
        </Container>
    );
};

export default Admin;
