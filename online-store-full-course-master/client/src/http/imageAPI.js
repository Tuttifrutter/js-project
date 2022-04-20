import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const createFriend = async (friend) => {
    const {data} = await $authHost.post('api/friend', friend)
    return data
}

export const fetchFriends = async () => {
    const {data} = await $authHost.get('api/friend')
    return data
}

export const createTheme = async (theme) => {
    const {data} = await $authHost.post('api/theme', theme)
    return data
}

export const fetchThemes = async () => {
    const {data} = await $authHost.get('api/theme', )
    return data
}

export const createImage = async (image) => {
    const {data} = await $authHost.post('api/image', image)
    return data
}

export const fetchImages = async (friendId, themeId, page, userId=null, limit= 5) => {
    const {data} = await $authHost.get('api/image', {params: {
        friendId, themeId, page, limit, userId
        }})
    return data
}

export const fetchOneImage = async (id) => {
    const {data} = await $authHost.get('api/image/' + id)
    return data
}

export const dis_like = async (imageId, userId, meaning) =>{ 
    const {data} = await $authHost.post('api/dis_like/', {imageId, userId, meaning})

    const strL="likeBtn"; const strD="dislikeBtn";
    var btn = document.getElementById("lbtn"+imageId);
    var btn2 = document.getElementById("dbtn"+imageId);

    if(meaning =='1'){
        if(btn.classList.contains(strL)){
            btn.classList.remove(strL);   
        }else{
             btn.classList.add(strL);
             if(btn2.classList.contains(strD));
             btn2.classList.remove(strD); 
        }
    } else {
        if(btn2.classList.contains(strD)){
            btn2.classList.remove(strD);   
        }else{
             btn2.classList.add(strD);
             if(btn.classList.contains(strL));
             btn.classList.remove(strL); 
        }
    }

    document.getElementById("likeNum"+imageId).innerHTML=data.like_count;
    document.getElementById("dislikeNum"+imageId).innerHTML=data.dislike_count;
    return data
}

export const getLikeList = async (userId) => {
    const {data} = await $authHost.get('api/dis_like/', {params:{userId}})
    return data
}

export function getUserProfile(nameId, avatarId){
    setTimeout(()=>{
        if(document.getElementById(nameId)!=null && document.getElementById(avatarId)!=0){
    document.getElementById(nameId).innerHTML=localStorage.getItem("userName");
    document.getElementById(avatarId).src = process.env.REACT_APP_API_URL+localStorage.getItem("userAvatar");;
    }}, 300)
   
 }

 export function getImgNick(id, local){
    setTimeout(()=>{
        if(document.getElementById("nickName"+id)!=null && localStorage.getItem(local+id)!=null){
            const res = localStorage.getItem(local+id).split(" ");
            const nick = res[0].slice(res[0].indexOf("'")+1, res[0].lastIndexOf("'"));
            const img = res[1].slice(res[1].indexOf("'")+1, res[1].lastIndexOf("'"));
        document.getElementById("nickName"+id).innerHTML = nick;
        document.getElementById("userImg"+id).src = process.env.REACT_APP_API_URL +img;
    }}, 10)
 }

 export const getComments = async (imageId) => {
    const {data} = await $authHost.get('api/comment',{params: {imageId}})
    return data
}

export function dataParse(data){
    let dt;
    if(data!=null && data!=undefined){
        dt = data.split("T");
        const months =["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const date = dt[0]; 
        const time = dt[1]; 
        const ymd =date.split("-");
        const y = ymd[0];
        const m = ymd[1];
        let d = ymd[2];
        const hm = time.split(":");
        let h = (parseInt(hm[0])+3).toString();
        let min = hm[1]; 
        if(h == "24"){
            h="00";
        }
        if(min == "60"){
            min="00";
        }
        if(getCurrentTime()==h+":"+min && getCurrentDate()==d+"/"+m+"/"+y)
        {
            return "только что";
        }
        if(getCurrentDate()==d+"/"+m+"/"+y){
            return "сегодня в "+h+":"+min;
        }
        let arr=getCurrentDate().split("/");
        if(arr[1]==m && arr[2]==y && arr[0]!=d){
            if(parseInt(arr[0])-1 == parseInt(d)){
                return "вчера в "+ h+":"+min;
            } else {
                return parseInt(d)+" "+months[parseInt(m)-1]+" "+h+":"+min;
            }
        } else if(arr[1]!=m && arr[2]==y && arr[0]!=d){
            return d+" "+months[parseInt(m)-1]+" "+h+":"+min;
        } else{
            return d+" "+months[parseInt(m)-1]+"/"+y+" "+h+":"+min;
        }
    }else
        return "wrong time format"
    
}

export function getCurrentDate(separator="/"){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}

export function getCurrentTime(separator=":"){
    let newTime = new Date()
    let minutes = newTime.getMinutes();
    let hours = newTime.getHours();
    return hours+separator+minutes;
}

export const sendComment = async (imageId, userId) => {
    var t = document.getElementById("input");
    let data;
    if(t.value!="" && t.value!=null && t.value!=undefined ){
        var text = t.value;
        if(text.length>=500){
            alert("Комментарий слишком большой, уложитесь в 500 символов, друг");
        }else{
            data = await $authHost.post('api/comment',{imageId, userId, text}).then(result => alert("Комментарий: '"+result.data.text+"' добавлен"));
            t.value = "";
            window.location.reload();
        }
    }else
        alert("Комментарий пустой, как моя жизнь(((");
}