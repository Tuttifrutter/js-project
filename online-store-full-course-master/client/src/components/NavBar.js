import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, GALLERY_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import {getUserProfile} from "../http/imageAPI";
import Image from "react-bootstrap/Image";
import styles from './Header/Header.module.css' 
import st from './iconfont/material-icons.css'
import { USERPAGE_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const userId = localStorage.getItem('userId');
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem("choosenUserId");
    }

    return (
        <Navbar bg="light" expand="lg">
            
            <Container>
            <nav className={styles.Header__logo}>PhotoApp</nav>
            <div >
            <input type="text" placeholder="Поиск" className={styles.Header__search}/>
            <Button className='ml-2' variant={"dark"}>
                Find
            </Button>
            </div>
        
            <div className={styles.Header__wrapper}>
                <div className={styles.Header__item}>
                    <span class="material-icons" onClick={localStorage.removeItem("choosenUserId")}>
                        <NavLink to={GALLERY_ROUTE}>home</NavLink>
                    </span>
                </div> 
                <div className={styles.Header__item}>
                    <span class="material-icons" >
                        send
                    </span>    
                </div> 
                <div className={styles.Header__item}>
                    <span class="material-icons">
                        explore
                    </span>
                </div> 
                <div className={styles.Header__item}>
                    <span class="material-icons">
                        favorite
                    </span>    
                </div> 
                <div className={styles.Header__item}></div> 
                
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={"dark"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Add
                        </Button>
                        <Button
                            variant={"dark"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Logout
                        </Button>
                        
                        <Image id="myAvatar" className={styles.Header__userLogo} width='30' height='30'src={getUserProfile("myName","myAvatar")} onClick={(event) => {localStorage.setItem("choosenUserId", userId);  history.push(USERPAGE_ROUTE + '/' + userId)}}/>
                            <nav id="myName" className={styles.Header__userName}>{}</nav>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"dark"} onClick={() => history.push(LOGIN_ROUTE)}>Login</Button>
                    </Nav>
                }
            </div>

                
            </Container>
        </Navbar>

    );
});

export default NavBar;
