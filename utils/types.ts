export interface TrendList {
    date: string
    trends: Trend[]
}

export interface Trend {
    rank: number
    keyword: string
    times: number
    url: string
}

export interface Weibo {
    user: User //  发送微博用户
    created_at: string //  微博创建时间
    content: string //  具体内容
    likes_count: number //  赞数
    comments_count: number //  评论数
    reposts_count: number //  转发数
}

export interface User {
    id: number //  用户id
    username: string //  用户名
}
