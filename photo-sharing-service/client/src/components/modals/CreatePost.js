import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createImage, fetchThemes, fetchImages, fetchFriends} from "../../http/imageAPI";
import {observer} from "mobx-react-lite";

const CreateImage = observer(({show, onHide}) => {
    const {image} = useContext(Context)
    const [name, setName] = useState('')
    const [text, setText] = useState('')//
    const [location, setLocation] = useState('') //
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchFriends().then(data => image.setFriends(data))
        fetchThemes().then(data => image.setThemes(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addImage = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', file)
        formData.append('location', location)
        formData.append('text', text)
        formData.append('themeId', image.selectedTheme.id)
        formData.append('friendId', localStorage.getItem("userId"))
        formData.append('userId', localStorage.getItem("userId"))
        createImage(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить изоображение
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{image.selectedTheme.name || "Выберите тему"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {image.themes.map(theme =>
                                <Dropdown.Item
                                    onClick={() => image.setSelectedTheme(theme)}
                                    key={theme.id}
                                >
                                    {theme.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название изоображения"
                    />
                    <Form.Control
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="mt-3"
                        placeholder="Введите ваше местоположение"
                    />
                    <Form.Control
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className="mt-3"
                        placeholder="Введите подпись к изоображению"
                    />

                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addImage}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateImage;
