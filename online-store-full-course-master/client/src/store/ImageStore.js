import {makeAutoObservable} from "mobx";

export default class ImageStore {
    constructor() {
        this._friends = []
        this._themes = []
        this._images = []
        this._comments =[]
        this._selectedFriend = {}
        this._selectedTheme = {}
        this._userInfo ={}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setComments(comments){
        this._comments = comments
    }

    setFriends(friends) {
        this._friends = friends
    }
    setThemes(themes) {
        this._themes = themes
    }
    setImages(images) {
        this._images = images
    }

    setSelectedFriend(friend) {
        this.setPage(1)
        this._selectedFriend = friend
    }
    setSelectedTheme(theme) {
        this.setPage(1)
        this._selectedTheme = theme
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    setUserInfo(info){
        this._userInfo = info
    }

    get comments(){
        return this._comments
    }
    get friends() {
        return this._friends
    }
    get themes() {
        return this._themes
    }
    get images() {
        return this._images
    }
    get selectedFriend() {
        return this._selectedFriend
    }
    get selectedTheme() {
        return this._selectedTheme
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get getUserInfo(){
        return this._userInfo 
    }

}
