const {LikeDislike} = require('../models/models')
const ApiError = require('../error/ApiError');

class Dis_LikeController{
    async set(req, res){
        const {imageId, userId, meaning} = req.body
        if(!imageId || !userId || !meaning){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        const likeNode = await LikeDislike.findOne(
            {
                where:{imageId, userId}, 
            }
        )
        if(!likeNode){
            const newNode = await LikeDislike.create({imageId, userId, meaning})// Создаем новую запись
            return res.json(newNode)
        }
        if(likeNode.meaning == meaning){
            const delNode = await LikeDislike.findOne(
                {
                    where:{imageId, userId} //Удаляем запись из бд
                }
            ).then(task => {
                return res.json(task.destroy());
              })//выходим
        }
        if(likeNode.meaning != meaning){
            const chgNode = await LikeDislike.update({meaning: meaning}, {where:{imageId, userId}})
            const upNode = await LikeDislike.findOne(
                {
                    where:{imageId, userId}, 
                }
            )
            return res.json(upNode)  //Изменяем запись в бд   //выходим
        }
    }
}

module.exports = new Dis_LikeController()