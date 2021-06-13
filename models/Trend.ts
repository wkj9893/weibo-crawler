import mongoose from 'mongoose'

const TrendSchema = new mongoose.Schema({
    date: String,
    trends: [
        {
            rank: Number,
            keyword: String,
            times: Number,
            url: String,
        },
    ],
})

export default mongoose.models.Trend || mongoose.model('Trend', TrendSchema)
