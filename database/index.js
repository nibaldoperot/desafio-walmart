import mongoose from 'mongoose';

class Connection{

    static connect(){
        mongoose.connect('mongodb://mongo/walmart-products')
        .then((db)=> { 
            console.log('DB is connected', {db})
            return db;
        })
        .catch((err)=> { console.err(err)
            return err;
        })
    }
}

export default Connection;