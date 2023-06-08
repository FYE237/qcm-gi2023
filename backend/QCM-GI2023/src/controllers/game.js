const status = require('http-status');

const Game = require('../models/game.js');
const GamePlayer = require('../models/gamePlayer.js')

const CodeError = require('../util/codeError.js');
const gamePlayer = require('../models/gamePlayer.js');
const game = require('../models/game.js');
const gameQcm = require('../models/gameQcm.js');
// const has = require('has-keys');


module.exports = {   
    /**
     * Create a new game
     * @param {*} req 
     * @param {*} res 
     */
    async newGame(req, res, next){
        try {
            
            if(!req.body.name || !req.body.startTime ||  !req.body.duration)
                {
                    throw new CodeError("Game creator or start time or duration not specified")
                } 
            
            const game = new Game({nameCreator: req.body.name, 
                                   startTime: req.body.startTime,
                                   statut: STATUS.PENDING,
                                   duration: req.body.duration
                                });

            const data = await game.save();

            req.idGame = data._id;
            next();

            
        } catch (error) {
            res.status(400);
            res.json({status: false, message: 'Error. Game creator or start time  or duration not specified'})
        }
    },

    /**
     * Set the QCM of the created Game
     * @param {*} req 
     * @param {*} res 
     */
    async setGameQcm(req,res){
        try {
            
            const qcm = new gameQcm({
                idGame: req.idGame,
                questions: req.body.qcm
            })

            await qcm.save()

            res.status(200);
            res.json({status: true, message: 'Game created succesfully', gameId:data._id})


        } catch (error) {
            res.status(400);
            res.json({status: false, message: 'Error. qcm json object is not correct.' });
        }
    },

    /**
     * Function call to start the game. Here when the countdown since the creation is finish
     * @param {*} idGame 
     */
    async startGame(idGame){
        try {
            
            if(!idGame){
                throw new CodeError("Impossible to update game status to start")
            }

            await game.updateOne({_id: idGame},{statut: STATUS.START})

        } catch (error) {
            throw error;
        }
    },


    /**
     * Change the game status to finish
     * @param {*} idGame
     */
    async finishGame(idGame){
        try {
            
            if(!idGame){
                throw new CodeError("Impossible to update game status to finish")
            }

            await game.updateOne({_id: idGame},{statut: STATUS.FINISH})

        } catch (error) {
            throw error;
        }
    },

    /**
     * THis function is called in a socket communication.On the addPLayer event
     * @param {*} name 
     * @param {*} idGame 
     * @param {*} socket : socket used to communicate with the player
     * @returns 
     */
    async addPlayerToGame(name, idGame, socket){
        try {
            if(!name || idGame || idSocket){
                throw new CodeError("Player name or idGame or idSocket not specified")
            }
    
            const gamePlayer = new GamePlayer({
                name: name,
                idGame: idGame,
                points: 0,
                idSocket: idSocket
            })
    
            const gameData = await game.findOne({idGame:idGame});

            //A player joins the game only if it is in the pending state
            if(gameData.statut === STATUS.PENDING)
                {
                    const data = await gamePlayer.save();
                    return true
                }
             else return false;


        } catch (error) {

            // res.status(400);
            // res.json({status: false, message: 'Player name or idGame or idSocket not specified'})
            //return false;
            throw error;

        }
    },

    /**
     * This method returns the list of player of a game
     * @param {*} idGame 
     */
    async getPlayerList(idGame){

        try {

            const data = await gamePlayer.find({idGame:idGame});
            let playerList = [];
            data.forEach(element => {
                let objet = {name: element.name}
                playerList.push(objet)
            })

            return playerList;

        } catch (error) {
            throw error
        }

    },

    /**
     * This function is called in socket communication, on the addPointToPLayer socket event
     * @param {*} name 
     * @param {*} idGame 
     */
    async addPointToPlayer(name, idGame){

        try {
            
            if(!name || idGame || idSocket){
                throw new CodeError("Player name or idGame or idSocket not specified")
            }

            //we get the previous points of the player
            const playerPoints = await  gamePlayer.findOne({name:name})

            //We add one point to the player
            await gamePlayer.updateOne({
                name:name,
                points:playerPoints.points + 1
            })


        } catch (error) {
            throw error;
        }

    }
        

    
    
}
