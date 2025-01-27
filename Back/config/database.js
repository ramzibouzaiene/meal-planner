import mongoose from 'mongoose'

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/mealplanner'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Connected to MongoDB successfully')
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
