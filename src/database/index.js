import mongoose  from 'mongoose';
import log from "../config/logger";

class Connection{

    /**
     * Método de conexión a base de datos mongo
     */
    static connect(){
        const logger = log.logger();
        const dburl = "mongodb://productListUser:productListPassword@127.0.0.1:27017/promotions?authSource=admin";
        mongoose.connect(dburl, function(err, db) { // eslint-disable-line
            if (err) {
                logger.error('Error al conectar a mongoDB', {err});
                throw err;
            }
            logger.info('db connected', {db});
            // db.close();
        });

    }
}

export default Connection;