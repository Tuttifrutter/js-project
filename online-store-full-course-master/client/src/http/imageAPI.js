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

export const fetchImages = async (friendId, themeId, page, limit= 5) => {
    const {data} = await $authHost.get('api/image', {params: {
        friendId, themeId, page, limit
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

export function getUserProfile(){
    setTimeout(()=>{
        if(document.getElementById("myName")!=null && document.getElementById("myAvatar")!=0){
    document.getElementById("myName").innerHTML=localStorage.getItem("userName");
    document.getElementById("myAvatar").src = process.env.REACT_APP_API_URL+localStorage.getItem("userAvatar");;
    }}, 300)
   
 }

 export function getImgNick(id, local){
    setTimeout(()=>{
        if(document.getElementById("nickName"+id)!=null){
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
    const date = dt[0]; 
    const time = dt[1]; 
    const ymd =date.split("-");
    const y = ymd[0];
    const m = ymd[1];
    const d = ymd[2];
    const hm = time.split(":");
    const h = (parseInt(hm[0])+3).toString();
    const min = hm[1]; 
    return d+"/"+m+"/"+y+" "+h+":"+min;
    }else
        return "wrong time format"
    
}