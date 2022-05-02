import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, first_name, second_name, nick_name, birthday) => {
    const {data} = await $host.post('api/user/registration', {email, password,first_name, second_name, nick_name, birthday, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const info = async (email) => {
    const {data} = await $host.post('api/user/info', {email})
    return data
}

export const userInfo = async (userId) => {
     const {data} = await $host.post('api/user/userinfo', {userId})
     const res = "nick='"+data.nick_name+"' img='"+data.img+"'";
     return res
}

export const getUserInfo = async (userId) => {
    const {data} = await $host.post('api/user/userinfo', {userId})
    return data
}

export const subscribe = async(userId, subuserId)=>{
    const {data} = await $host.post('api/subscribe', {userId, subuserId})    // подписка
    return data
}

export const getSubscribesName= async (userId) => {
    return await $authHost.get('api/subscribe/', {params:{userId}})      //получение списка юзеров на которые подписан пользователь
}

export const getSubscribersId= async (subuserId) => {
    const {data} = await $authHost.get('api/subscribe/rs', {params:{subuserId}})      //получение списка id юзеров которые подписаны на пользователя
    return data
}

export const subscribeOrNot= async (userId, subuserId) => {
    const {data} = await $authHost.get('api/subscribe/ornot', {params:{userId, subuserId}})      //получаем true если user подписан на subuser
    return data
}

export const subButton = async (value) =>{ 
    let res;
    let flag = true;
    if(value == "*"){
        res = "Изменить"
        flag = true;
    }else if(value == true){
        res = "Вы подписаны"
        flag = false;
    }else if(value == false){
        res = "Подписаться"
        flag = false;
    }else{
        res = "Опачки"
        flag = true;
    }
        document.getElementById("subbtn").innerHTML=res;
        document.getElementById("subbtn").disabled = flag;
    return res
}

export const setStatus= async (userId, value) =>{
    localStorage.setItem('status', value);
    const {data} = await $host.post('api/user/status', {userId, value}) 
    return data
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/user/all' )
    return data
}