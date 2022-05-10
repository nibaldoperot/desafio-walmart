import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    id: Number,
    brand: String,
    description: String,
    image: String,
    price: Number
});

export default mongoose.model('Product', productSchema);