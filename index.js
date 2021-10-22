import express from 'express';
import cors from 'cors'

const server = express();

server.use((req, res, next) => {
    server.use(cors());
    next();
})
server.use(express.json());

const games = [];

server.get('/games', (req, res) => {
    return res.json(games)
})

server.post('/games', (req, res) => {
    const { name } = req.body;
    
    for(let i = 0; i <= games.length; i++){
        if(name === games[i]){
            return res.status(400).json({error: 'Você já inseriu este jogo em sua lista'})
        }
    }

    games.push(name)

    return res.json(games)
})

server.put('/games/:pos', (req, res) => {
    const { pos } = req.params;
    const { name } = req.body;

    if(games[pos] === undefined){
        return res.status(400).json({error: "Não existe um jogo nesta posição"})
    }

    if(name === games[pos]){
        return res.status(400).json({error: "Os dados do jogo continuam o mesmo"})
    }

    games[pos] = name;

    return res.json(games)
})

server.delete('/games/:pos', (req, res) => {
    const { pos } = req.params;

    if(games[pos] === undefined){
        return res.status(400).json({error: "Não existe um jogo nesta posição"})
    }

    games.splice(pos, 1)

    return res.json({message: `A exclusão do jogo na posição ${pos} foi feita com sucesso `})
})

server.listen(3333)