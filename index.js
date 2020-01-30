const express = require('express')
const server = express()
server.use(express.json());

const projects = []

//Middlewares Global
server.use((req , res, next ) => {

    console.count('Quantas requisiçoes?')
    return next()

});

//Middlewares Local
function checkIdExist(req, res, next){
   
    const { id } = req.params;
    const project = projects.find(proj => proj.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Id not exist!' });
    }

    return next();

}

//cadastrar nova tarefa
server.post('/projects', (req, res) => {

    const { id, name } = req.body
    const project = {
        id,
        name,
        tasks : []
    }

    projects.push(project)

    return res.json(projects)
   
})

server.post('/projects/:id/task',checkIdExist, (req, res) => {

    const { title } = req.body
    const { id } = req.params

    project = projects.find(proj => proj.id == id);
    project.tasks.push(title)  

    return res.json(projects)
   
})

//Lista todas as tarefas
server.get('/projects', (req, res) => {

    return res.json(projects)   

})

//Lista todas as tarefas
server.get('/projects/:id', checkIdExist, (req, res) => {

    const { id } = req.params

    return res.find(projects)  

})

//alterar a tarefa
server.put('/projects/:id', checkIdExist, (req, res) => {

    const { id } = req.params
    const { name } = req.body

    project = projects.find(proj => proj.id == id);
    project.name = name

    return res.json(projects)

})

//deleta a tarega
server.delete('/projects/:id', checkIdExist, (req, res) => {

    const { id } = req.params

    projects.splice( projects.findIndex(proj => proj.id == id), 1)

    return res.send()

})

server.listen(3000)