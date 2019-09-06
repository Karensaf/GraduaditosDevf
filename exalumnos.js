const mongoose = require('mongoose');
const URL_MONGO ='mongodb+srv://Karen:Kariñosa1913@cluster0-kzrac.mongodb.net/test?retryWrites=true&w=majority'


    mongoose.connect(URL_MONGO,{useNewUrlParser: true}, (err)=>{
        if(!err){
            console.log('conexión exitosa con MongoBD')
        }else{
            console.log(err)
        }
    })

    const Schema = mongoose.Schema;

    const exalumnoSchema = new Schema({
        nombre:String,
        generation:Number,
        carrera:String,
        age:Number,
        current_job:String,
        income:Number
    },{timestamps:true});

    //[arreglo]  {objeto}

    const schoolSchema = new Schema({
        nombre:String,
        graduates:{
            type:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Exalumno'
            }]
        }
    })
    
    const Exalumno = mongoose.model('Exalumno', exalumnoSchema);
    const School = mongoose.model('School',schoolSchema);

    module.exports={
        Exalumno,
        School
    }