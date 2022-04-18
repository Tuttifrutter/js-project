const {Subscribe, User} = require('../models/models')
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
            return res.json(true)
        }

        if(likeNode){ //если в таблице уже есть подписка
            const delNode = await Subscribe.findOne(
                {
                    where:{userId, subuserId} //Удаляем запись из бд
                }
            ).then(task => {task.destroy()
            })
              return res.json(false)
        }
    }

    async get(req, res){
        const {userId} = req.query
        if(!userId){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
         let subListId; let subs=[]
            subListId = await Subscribe.findAll({where:{userId}});
            for(let i=0; i<subListId.length; i++){
                let id = subListId[i].subuserId;
                await User.findOne({where:{id}}).then(data=>subs.push({
                    id :id,
                    name: data.nick_name,
                    createdAt: subListId[i].createdAt,
                    updatedAt: subListId[i].updatedAt
                }));
            }
        return res.json(subs);
    }

    async getrs(req, res){
        const {subuserId} = req.query
        if(!subuserId){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
         let subListId; let subIds =[];
            subListId = await Subscribe.findAll({where:{subuserId}});
            for(let i=0; i<subListId.length; i++){
                subIds.push(subListId[i].userId);
            }
        return res.json(subIds);
    }

    async getornot(req, res){
        const {userId, subuserId} = req.query
        if(!subuserId || !userId){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
         let sub = await Subscribe.findOne({where:{userId, subuserId}});
         if(sub){
            return res.json(true);
         } else {
            return res.json(false);
         }
            
    }
}

module.exports = new SubscribeController()