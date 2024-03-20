import mongoose from 'mongoose';


const db=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE,
            {
                useUnifiedTopology:true,
                useNewUrlParser:true
            })
            // console.log('Mongo connected')
    }
    catch(err)
    {
        console.log("Error in database",err);
    }
}

export default db;