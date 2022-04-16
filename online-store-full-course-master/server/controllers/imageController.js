const uuid = require('uuid')
const path = require('path');
const {Image, ImageInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class ImageController {
    async create(req, res, next) {
        try {
            let {name, text, location, themeId, friendId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const image = await Image.create({name, text, location, themeId, friendId, img: fileName});

            return res.json(image)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
        let {themeId, friendId, limit, page, userId} = req.query
        console.log("themeid = ",themeId,", friendid = ", friendId,", limit = ", limit,", page = ", page, ", userId = ", userId)
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let images;
            if (!themeId && !friendId && !userId) {
                images = await Image.findAndCountAll({limit, offset})
                return res.json(images) // all undefined
            }

            if (themeId && !friendId && !userId) {
                images = await Image.findAndCountAll({where:{themeId}, limit, offset})
                return res.json(images) // themeId has value, others not
            }
            if (!themeId && friendId && !userId) {
                images = await Image.findAndCountAll({where:{friendId}, limit, offset})
                return res.json(images) // friendId has value, others not
            }
            if (!themeId && !friendId && userId) {
                images = await Image.findAndCountAll({where:{userId}, limit, offset})
                return res.json(images) // userId has value, others not
            }

            if (themeId && !friendId && userId) {
                images = await Image.findAndCountAll({where:{themeId, userId}, limit, offset})
                return res.json(images) //themeId, userId have values, friendId not
            }
            if (!themeId && friendId && userId) {
                images = await Image.findAndCountAll({where:{friendId, userId}, limit, offset})
                return res.json(images) //friendId, userId have values, themeId not
            }
            if (themeId && friendId && !userId) {
                images = await Image.findAndCountAll({where:{friendId, themeId}, limit, offset})
                return res.json(images) //friendId, themeId have values, userId not
            }

            if (themeId && friendId && userId) {
                images = await Image.findAndCountAll({where:{friendId, themeId, userId}, limit, offset})
                return res.json(images) //everyone has value
            }
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const image = await Image.findOne(
            {
                where: {id},
                //include: [{model: ImageInfo, as: 'info'}]
            },
        )
        return res.json(image)
    }
}

module.exports = new ImageController()
