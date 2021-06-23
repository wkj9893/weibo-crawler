import mongoose from 'mongoose'

const WeiboSchema = new mongoose.Schema({
    url: String, //微博URL
    user: {
        id: Number,
        username: String,
    }, //  发送微博用户
    created_at: String, //  微博创建时间
    content: String, //  具体内容
    likes_count: Number, //  赞数
    comments_count: Number, //  评论数
    reposts_count: Number, //  转发数
})

export default mongoose.models.Weibo || mongoose.model('Weibo', WeiboSchema)
