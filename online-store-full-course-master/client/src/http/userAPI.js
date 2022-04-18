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
    if(value == "*"){
        res = "Изменить"
    }else if(value == true){
        res = "Вы подписаны"
    }else if(value == false){
        res = "Подписаться"
    }else{
        res = "Опачки"
    }

    document.getElementById("subbtn").innerHTML=res;
    return res
}
