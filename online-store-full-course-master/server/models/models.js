const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    first_name: {type: DataTypes.STRING},
    second_name: {type: DataTypes.STRING},
    nick_name: {type: DataTypes.STRING},
    birthday: { type: DataTypes.DATE},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    img:{type: DataTypes.STRING(1000)},
    status: {type: DataTypes.STRING(100)}
})

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    like_count:{type:DataTypes.INTEGER, defaultValue: 0},
    dislike_count:{type:DataTypes.INTEGER, defaultValue: 0}, 
    text: {type: DataTypes.STRING(1000)},
    location:{type: DataTypes.STRING, allowNull: false},
    img:{type: DataTypes.STRING, allowNull: false}
})

const Friend = sequelize.define('friend', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Theme = sequelize.define('theme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ImageInfo = sequelize.define('image_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const FriendTheme = sequelize.define('friend_theme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const LikeDislike = sequelize.define('like_dislike', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    meaning: {type: DataTypes.STRING}, // 1 -like , 0 - dislike
})

const Comment = sequelize.define('comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    text: {type: DataTypes.STRING(1000)}
})

const Subscribe = sequelize.define('subscribe', {
    subuserId : {type: DataTypes.INTEGER}
})

User.hasMany(LikeDislike)
LikeDislike.belongsTo(User)

User.hasMany(Subscribe)
Subscribe.belongsTo(User)

User.hasMany(Image)
Image.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Image.hasMany(LikeDislike)
LikeDislike.belongsTo(Image)

Image.hasMany(Comment)
Comment.belongsTo(Image)

Friend.hasMany(Image)
Image.belongsTo(Friend)

Theme.hasMany(Image)
Image.belongsTo(Theme)

Image.hasMany(ImageInfo, {as: 'info'});
ImageInfo.belongsTo(Image)

Friend.belongsToMany(Theme, {through: FriendTheme })
Theme.belongsToMany(Friend, {through: FriendTheme })

module.exports = {
    User,
    Image, 
    LikeDislike,
    Comment,
    Friend,
    Theme,
    Subscribe,
    FriendTheme,
    ImageInfo
}





