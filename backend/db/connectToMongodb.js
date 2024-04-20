import mongoose from 'mongoose';
const connectToMongodb = async () => {
    try {
        await mongoose.connect(process.env.db_connect); {
            console.log('Connected to MongoDB');  
        }
        
    } catch (error) {
        console.log(error.message);
    }
}
export default connectToMongodb