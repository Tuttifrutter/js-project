const {Friend} = require('../models/models')
const ApiError = require('../error/ApiError');

class FriendController {
    async create(req, res) {
        const {name} = req.body
        const type = await Friend.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Friend.findAll()
        return res.json(types)
    }

}

module.exports = new FriendController()
