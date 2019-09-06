const express = require('express');
const bodyparse = require ('body-parser');
//AGRAGAR EL NOMBRE DEL NUEVO
const {Exalumno,School} = require('./exalumnos.js')
const cors = require ('cors');
const app = express();

app.use(bodyparse.urlencoded({extended:true}));
app.use(bodyparse.json());
app.use(cors());

//const PORT = 2000;
const PORT = process.env.PORT || 3000


app.get('/', (request,response) =>{
    response.send({message:'Bienvenido a mi API'})
})

//Para crear publicacion es un post
app.post('/create/graduate',(request,response)=>{
    /*  nombre:String,
        generation:Number,
        carrera:String,
        age:Number,
        current_job:String,
        income:Number 
        */
    const {nombre,generation,carrera,age,current_job,income} = request.body;
    //const hola = request.body
    const newGraduate = Exalumno ({
        nombre,
        generation,
        carrera,
        age,
        current_job,
        income
       // hola
    })

    newGraduate.save((err,graduate)=>{
        !err
        ? response.status(201).send(graduate)
        : response.status(400).send(err)
    })
});

app.get('/all/graduates',(req,res)=>{
    Exalumno.find(/*name:Manuel*/).exec()
    .then(exalumnos => res.status(200).send(exalumnos))
    .catch(err => res.status(409).send(err))
})

app.get('/graduate/:id',(req,res)=>{
    const {id} = req.params;
    Exalumno.findById(id).exec()
    .then(exalumno => exalumno ? res.status(200).send(exalumno): res.status(404).send({message:'Not found'}))
    .catch(err => res.status(409).send(err))
})


app.post('/create/school',(req,res) => {
    const {nombre,graduates} = req.body
    const newSchool = School ({
        nombre,
        graduates
    })
    newSchool.save((err,body) =>{
        ! err
        ? res.status(201).send(body)
        :res.satatus(404).send(err)
    })
})

app.get('/school/:id',(req,res) =>{
    const {id} = req.params
    School.findById(id).populate('graduates').exec()
        .then(school => res.status(200).send(school))
        .catch(err => res.status(400).send(err))
})

app.listen(PORT, () => {
    console.log(`Server inicializado en el puerto ${PORT}`)
});