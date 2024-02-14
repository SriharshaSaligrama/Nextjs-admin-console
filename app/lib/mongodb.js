import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

export const connectToDatabase = async () => {
    const connection = {}

    try {
        if (connection.isConnected) {
            return
        }
        const db = await mongoose.connect(uri)
        connection.isConnected = db.connections?.[0]?.readyState
        console.count(`mongoDbConnected: ${!!connection.isConnected}`)
    } catch (error) {
        console.log({ mongoDbConnectionError: error })
        return error
    }
}
