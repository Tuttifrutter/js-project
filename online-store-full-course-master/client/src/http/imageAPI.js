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
    return data
}