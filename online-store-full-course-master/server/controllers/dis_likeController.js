const {LikeDislike} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Image} = require('../models/models')

class Dis_LikeController{
    async set(req, res){
        const {imageId, userId, meaning} = req.body
        if(!imageId || !userId || !meaning){
            return res.json(ApiError.badRequest('Не заданы все параметры'))
        }
        let dis_like;
        const id=imageId;
        const likeNode = await LikeDislike.findOne(
            {
                where:{imageId, userId}, 
            }
        )
        if(!likeNode){
            const newNode = await LikeDislike.create({imageId, userId, meaning})// Создаем новую запись
            if(meaning == 1){ //если это лайк
                await Image.increment({like_count:1},{where:{id}})
                dis_like = await Image.findOne({where:{id}});
            }else // если дизлайк
            {
                await Image.increment({dislike_count:1},{where:{id}})
                dis_like = await Image.findOne({where:{id}});
            }
            
            return res.json(dis_like)
        }

        if(likeNode.meaning == meaning){ //если в таблице уже есть оценка поста и она совпадает с переданной
            if(meaning == 1){ //если это лайк
                await Image.decrement({like_count:1},{where:{id}})
                dis_like = await Image.findOne({where:{id}});
            }else //если это дизлайк
            {
                await Image.decrement({dislike_count:1},{where:{id}})
                dis_like = await Image.findOne({where:{id}});
            }
            const delNode = await LikeDislike.findOne(
                {
                    where:{imageId, userId} //Удаляем запись из бд
                }
            ).then(task => {task.destroy()
              })
              return res.json(dis_like);//выходим
        }

        if(likeNode.meaning != meaning){ //если в таблице уже есть оценка поста и она не совпадает с переданной
            const chgNode = await LikeDislike.update({meaning: meaning}, {where:{imageId, userId}})
            if(meaning == 1){// если передали лайк
                await Image.increment({like_count:1},{where:{id}})
                await Image.decrement({dislike_count:1},{where:{id}})
                dis_like = await Image.findOne({where:{id}});
            }else // если передали дизлайк
            {
                await Image.increment({dislike_count:1},{where:{id}})
                await Image.decrement({like_count:1},{where:{id}})
                dis_like = await Image.findOne({where:{id}});
            }
            const upNode = await LikeDislike.findOne(
                {
                    where:{imageId, userId}, 
                }
            )
            return res.json(dis_like)  //Изменяем запись в бд   //выходим
        }
    }

    async get(req, res){
        const {userId} = req.query
        const meaning = "1"; let imgListId; let imgIds =[];
            imgListId = await LikeDislike.findAll({where:{userId, meaning}});
            for(let i=0; i<imgListId.length; i++){
                imgIds.push(imgListId[i].imageId);
            }
        return res.json(imgIds);
    }
}

module.exports = new Dis_LikeController()