const commedModel = require('../model/commend')

exports.commend_get = async (req, res) => {

    const id = req.params.commendId

    try{
        const commend = await commedModel.findById(id)
                            .populate('user', ['email'])
                            .populate('board', ['board'])

        if(!commend){
            return res.status(402).json({
                msg : "no commendId"
            })
        }
        else{
            res.status(200).json({
                msg : "get commend",
                commendInfo : {
                    id : commend._id,
                    user : commend.user,
                    board : commend.board,
                    commend : commend.commend
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.commend_register = async (req, res) => {

    const { user, board, commend } = req.body

    const newCommend = new commedModel({
        user, board, commend
    })

    try{
        const commend = await newCommend.save()

        res.status(200).json({
            msg : "register commend",
            commendInfo : {
                id : commend._id,
                user : commend.user,
                board : commend.board,
                commend : commend.commend
            }
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.commend_update = async (req, res) => {

    const id = req.params.commendId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    try{
        const commend = await commedModel.findByIdAndUpdate(id, {$set : updateOps})

        if(!commend){
            return res.status(402).json({
                msg : "no commendId"
            })
        }
        else{
            res.status(200).json({
                msg : "update commend by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.commend_delete = async (req, res) => {

    const id = req.params.commendId

    try{
        const commend = await commedModel.findByIdAndRemove(id)

        if(!commend){
            return res.status(402).json({
                msg : "no commendId"
            })
        }
        else{
            res.status(200).json({
                msg : "delete commend by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};