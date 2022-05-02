import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserItem from "./SearchUserItem"
import { getAllUsers } from '../http/userAPI'
import styles from "./SearchUserItemStyle/Card.module.css"


const UsersSearch = ()=>{

    const [users, setUsers] = useState([])
    const getUsers = ()=> {
        getAllUsers()
            .then((response)=>{
                setUsers(response)
            })
    } 
    useEffect(()=>{
        getUsers()  
    }, [])


    const [value, setValue] = useState('')

    const filteredUsers = users.filter(user =>{
        let searchvalue = user.nick_name+user.first_name+user.second_name+user.email;
        return searchvalue.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div className={styles.userSearch}>
            <div>
                <input type='text'
                        className={styles.dropbtn}
                        placeholder='Search in users'
                        onChange={(event) => setValue(event.target.value)}
                        onClick ={()=> document.getElementById("myDropdown").classList.toggle(styles.show)}
                />
            </div>
            <div className = {styles.dropdown}> 
            <div id = "myDropdown" className= {styles.dropdown_content}>
                {
                    filteredUsers.map((user, index) => {
                        return (
                            <UserItem user={user} key = {index}/>
                        )
                    })
                }
            </div>
            </div>
        </div>

    )
}

export default UsersSearch