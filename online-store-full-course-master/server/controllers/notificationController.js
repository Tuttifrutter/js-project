const {Notification, Image} = require('../models/models')
const ApiError = require('../error/ApiError');

class NotificationController{

    async getAll(req, res){
        let {userId_to} = req.query
        if(!userId_to){
            return ApiError.badRequest("Всё сломалось!")
        }
        userId_to= parseInt(userId_to)
        if(userId_to){
            const usernotifics = await Notification.findAll( {where:{userId_to}})
            return res.json(usernotifics)
        }
    }
}

module.exports = new NotificationController()