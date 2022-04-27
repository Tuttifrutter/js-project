const {Notification, Image} = require('../models/models')
const ApiError = require('../error/ApiError');

class NotificationController{

    async getAll(req, res){
        let {userId_to} = req.query
        if(!userId_to){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        userId_to= parseInt(userId_to)
        if(userId_to){
            const usernotifics = await Notification.findAll( {where:{userId_to}})
            return res.json(usernotifics)
        }
    }
    
    async delete(req, res){
        const {userId_to} = req.body
        if(!userId_to){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        const delNode = await Notification.findAll({where:{userId_to}}).then(task => {
            for(let i=0; i<task.length; i++)
            task[i].destroy()
        })
        return res.json(delNode)
    }

}

module.exports = new NotificationController()