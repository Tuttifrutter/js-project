const {Comment, Image} = require('../models/models')
const ApiError = require('../error/ApiError');

class CommentController{
    async create(req, res){
        const {imageId, userId, text} = req.body
        if(!imageId || !userId || !text){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        const newComment = await Comment.create({imageId, userId, text})// Создаем новую запись
        await Image.increment({comment_count:1},{where:{id:imageId}});
        return res.json(newComment)
    }

    async delete(req, res){
        const {id, imageId} = req.body
        if(!id || !imageId){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        const delNode = await Comment.findOne({where:{id}}).then(task => {task.destroy()})
        await Image.decrement({comment_count:1},{where:{id:imageId}});
        return res.json(delNode)
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