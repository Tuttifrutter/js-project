const {Subscribe} = require('../models/models')
const ApiError = require('../error/ApiError');

class SubscribeController{

    async set(req, res){
        const {userId, subuserId} = req.body
        if(!subuserId || !userId){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }

        const likeNode = await Subscribe.findOne(
            {
                where:{userId, subuserId}, 
            }
        )
        if(!likeNode){
            const newNode = await Subscribe.create({userId, subuserId})// Создаем новую запись
            return res.json(newNode)
        }

        if(likeNode){ //если в таблице уже есть подписка
            const delNode = await Subscribe.findOne(
                {
                    where:{userId, subuserId} //Удаляем запись из бд
                }
            ).then(task => {task.destroy()
            })
              return res.json(delNode);//выходим
        }
    }

    async get(req, res){
        const {userId} = req.query
         let subListId; let subIds =[];
            subListId = await Subscribe.findAll({where:{userId}});
            for(let i=0; i<subListId.length; i++){
                subIds.push(subListId[i].subuserId);
            }
        return res.json(subIds);
    }

    async getrs(req, res){
        const {subuserId} = req.query
         let subListId; let subIds =[];
            subListId = await Subscribe.findAll({where:{subuserId}});
            for(let i=0; i<subListId.length; i++){
                subIds.push(subListId[i].userId);
            }
        return res.json(subIds);
    }

    async getornot(req, res){
        const {userId, subuserId} = req.query
         let sub = await Subscribe.findOne({where:{userId, subuserId}});
         if(sub){
            return res.json(true);
         } else {
            return res.json(false);
         }
            
    }
}

module.exports = new SubscribeController()