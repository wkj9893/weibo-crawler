---
# try also 'default' to start simple
theme: Seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://images.unsplash.com/photo-1618411165479-9e6396b7fd0a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjI0NDUyNTQy&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# some information about the slides, markdown enabled
info: |
    ## Slidev Starter Template
    Presentation slides for developers.

    Learn more at [Sli.dev](https://sli.dev)
---

# 信息内容安全实验 结题报告

1181000420 韦昆杰

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 p-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    下一页 <carbon:arrow-right class="inline"/>
  </span>
</div>

<a href="https://github.com/wkj9893" target="_blank" alt="GitHub"
  class="abs-br m-6 text-xl icon-btn opacity-50 !border-none !hover:text-white">
<carbon-logo-github />
</a>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# 项目设计

<br>
<br>

#### 本实验主要实现了一个小型的信息安全管理系统，实现了对微博的内容识别和控制，主要包含以下功能：

<br>
<br>
<br>

-   **网络信息数据分类获取** - 通过爬虫对微博进行爬取，对爬取的 HTML 进一步提取分析，得到信息
-   **网络协议还原分析** - 通过常见的字符串匹配算法(KMP、AC)将获取的信息进行关键字匹配，识别包含指定关键字的页面
-   **网络信息内容或报文特征识别** - 实现了 BF、KMP、BM、AC 算法，根据性能比较，选择 KMP 作为单模式匹配算法，AC 作为多模式匹配算法
-   **网络信息安全管理响应** - 针对匹配到的关键字或者微博网址通过举报、水军等方法进行有效管控
-   **系统辅助功能页面** - MongoDB 数据库存储爬取的热搜榜和微博，用户在网页端完成各项操作

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/guide/syntax#embedded-styles
-->

---

# 子系统介绍

<br>
<br>

#### 1. 微博热搜子系统

<br>
<br>
<br>

实时爬取微博当前的热搜，并在网页端展示出来，并存储到数据库中

<br>
<br>

```ts
interface Trend {
    rank: number
    keyword: string
    times: number
    url: string
}
```

<img src="/trend.png" class="absolute top-9 right-16 w-80"/>

---

# 子系统介绍

<br>
<br>

#### 2. 微博搜索子系统

<br>
<br>
<br>

输入要搜索的内容，系统爬取相关微博显示，爬取到的所有微博信息存储在数据库中

<br>
<br>

```ts
interface Weibo {
    url: string //微博URL
    user: User //  发送微博用户
    created_at: string //  微博创建时间
    content: string //  具体内容
    likes_count: number //  赞数
    comments_count: number //  评论数
    reposts_count: number //  转发数
}
```

<img src="/search.png" class="absolute top-9 right-16 w-100"/>

---

# 子系统介绍

<br>
<br>

#### 3. 微博过滤子系统

<br>
<br>
<br>

设置关键字，系统采用 KMP 或 AC 算法对微博进行匹配

<br>

(当关键字为 1 个时采用 KMP 算法，当关键字为多个时采用 AC 算法)

<img src="/filter.png" class="absolute top-24 right-2 w-100"/>

---

# 子系统介绍

<br>
<br>

#### 3. 微博过滤子系统

<br>
<br>
<br>
<br>
<br>
<br>
匹配到的微博

展示到网页上:

<img src="/result.png" class="absolute top-24 right-2 w-190"/>

---

# 子系统介绍

<br>
<br>

#### 4. 微博管控子系统

<br>
<br>
<br>
<br>
<br>
<br>

对匹配到的微博，可以进行管控，

通过举报该微博或进行相关信息微博的不断发送淹没该微博

<img src="/control.png" class="absolute top-24 right-20 w-120"/>

---

# 子系统介绍

<br>
<br>

#### 5. 数据库子系统

<br>
<br>
<br>

本实验采用 MongoDB 数据库，设计数据库操作子系统，

将热搜和微博信息存储到数据库中

<img src="/database1.png" class="absolute top-2 right-2 w-120"/>

---

# 子系统介绍

<br>
<br>

#### 5. 数据库子系统

<br>
<br>
<br>
<br>

爬取到的微博信息：

<img src="/database2.png" class="absolute top-0 right-0 w-180"/>
