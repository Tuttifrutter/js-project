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
        let {themeId, friendId, limit, page} = req.query
        console.log("themeid = ",themeId,", friendid = ", friendId,", limit = ", limit,", page = ", page)
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let images;
        if (!themeId && !friendId) {
            images = await Image.findAndCountAll({limit, offset})
        }
        if (themeId && !friendId) {
            images = await Image.findAndCountAll({where:{themeId}, limit, offset})
        }
        if (!themeId && friendId) {
            images = await Image.findAndCountAll({where:{friendId}, limit, offset})
        }
        if (themeId && friendId) {
            images = await Image.findAndCountAll({where:{friendId, themeId}, limit, offset})
        }
        return res.json(images)
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
