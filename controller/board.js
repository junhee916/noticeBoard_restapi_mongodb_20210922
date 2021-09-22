const boardModel = require('../model/board')

exports.boards_get_all = async (req, res) => {

    try{
        const boards = await boardModel.find()
                            .populate('user', ['email'])

        res.status(200).json({
            msg : "get boards",
            count : boards.length,
            boardInfo : boards.map(board => {
                return {
                    id : board._id,
                    user : board.user,
                    board : board.board,
                    boardImage : board.boardImage
                }
            })
        })
    }
    catch(err){
        res.status(500).json(
           {
               msg : err.message
           }
        )
    }
};

exports.boards_get_board = async (req, res) => {

    const id = req.params.boardId

    try{
        const board = await boardModel.findById(id)
                            .populate('user', ['email'])

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.status(200).json({
                msg : "get board",
                boardInfo : {
                    id : board._id,
                    user : board.user,
                    board : board.board,
                    boardImage : board.boardImage
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

exports.boards_register = async (req, res) => {

    const { user, board } = req.body

    const newBoard = new boardModel({
        user, 
        board,
        boardImage : req.file.path
    })

    try{
        const board = await newBoard.save()

        res.status(200).json({
            msg : "register board",
            boardInfo : {
                id : board._id,
                user : board.user,
                board : board.board,
                boardImage : board.boardImage
            }
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_update = async (req, res) => {

    const id = req.params.boardId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    try{
        const board = await boardModel.findByIdAndUpdate(id, {$set : updateOps})

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.status(200).json({
                msg : "update board by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_delete_all = async (req, res) => {

    try{
        await boardModel.remove()

        res.status(200).json({
            msg : "delete boards"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_delete_board = async (req, res) => {

    const id = req.params.boardId

    try{
        const board = await boardModel.findOneAndRemove(id)

        if(!board){
            return res.status(402).json({
                msg : "no boardId"
            })
        }
        else{
            res.status(200).json({
                msg : "delete board by id: " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};