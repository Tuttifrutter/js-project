import { observer } from "mobx-react-lite";
import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { info, login, registration, setStatus } from "../http/userAPI";
import { Context } from "../index";
import { GALLERY_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [second_name, setSecondName] = useState('')
    const [nick_name, setNickName] = useState('')
    const [birthday, setBirthday] = useState('')

    const click = async () => {
        try {
            let data;
            let userdata;
            if (isLogin) {
                data = await login(email, password);
                userdata = await info(email).then(userdata=>{                                   
                    localStorage.setItem('userId', userdata.userinfo.id);
                    localStorage.setItem('userName', userdata.userinfo.nick_name);
                    localStorage.setItem('userAvatar',userdata.userinfo.img);
                    setStatus(userdata.userinfo.id, "online")
                });
            } else {
                data = await registration(email, password, first_name, second_name, nick_name, birthday);
                userdata = await info(email).then(userdata=>{                                   
                    localStorage.setItem('userId', userdata.userinfo.id);
                    localStorage.setItem('userName', userdata.userinfo.nick_name);
                    localStorage.setItem('userAvatar',userdata.userinfo.img);
                    setStatus(userdata.userinfo.id, "online")
                });
            }
            user.setUser(user)
            user.setIsAuth(true)
                history.push(GALLERY_ROUTE)
        } catch (e) {
            alert(e.response.data.message);
            console.error(e.response.data.message);
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ?
                    <div>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    </div> :
                    <div>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Имя"
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Фамилия"
                        value={second_name}
                        onChange={e => setSecondName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="НИК"
                        value={nick_name}
                        onChange={e => setNickName(e.target.value)}
                    />
                    <Form.Control
                         type="date"
                         className="mt-3"
                         placeholder="Дата рождения"
                         value={birthday}
                         onChange={(e) => setBirthday(e.target.value)}
                    />
                    </div>}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
