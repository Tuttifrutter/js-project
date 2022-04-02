const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError');

class CommentController{
    async create(req, res){
        const {imageId, userId, text} = req.body
        if(!imageId || !userId || !text){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        const newComment = await Comment.create({imageId, userId, text})// Создаем новую запись
        return res.json(newComment)
    }

    async getAll(req, res){
        const {imageId, userId, text} = req.query
        if(!imageId && !userId && !text){
            const allcomments = await Comment.findAll()
            return res.json(allcomments)
        }
        if(imageId){
            const imagecomments = await Comment.findAll( {where:{imageId}})
            return res.json(imagecomments)
        }
        if(userId){
            const usercomments = await Comment.findAll( {where:{userId}})
            return res.json(usercomments)
        }
        if(text){
            const textcomments = await Comment.findAll( {where: {text} })
            return res.json(textcomments)
        }
    }
}

module.exports = new CommentController()