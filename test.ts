import { md2pdf } from './src/md2pdf';
const content = `
    # Nextjs@15正式发布，新的拦截器草案：\`Interceptor\`也在路上了


> 这两天\`Nextjs\`疯狂更新，终于把完整的版本推送上来了，所有的更新特性大家都在传，但是这些都不是最重要的，一直以来仅支持\`EdgeRuntime\`的阉割版本的\`Middleware\`都受到大家的吐槽，我们无法在\`middleware\`中完成数据库链接。



[Introduce experimental Request Interceptors](https://github.com/vercel/next.js/pull/70961)



## \`middleware\`的问题是什么
但是在原先的\`middleware\`下，由于进程是一个限制环境的\`EdgeRuntime\`，我们甚至无法完成数据库连接，导致我们无法完成上面的功能，准确来讲，我们无法脱离云环境（支持edge的云sql,云日志等）在我们自己的服务器上，在\`middleware\`中实现\`数据库连接\`，这也就意味着我们将失去：
- 请求日志的数据库记录
- 基于\`DB-Session\`机制的认证/授权信息
- 因此也无法注销账号登录



##  新的\`Interceptros\`能够解决什么问题

为了解决上面的问题，其实社区已经经过无数次探讨，经过漫长的研究，官方终于决定推出\`Request Interceptor\`，官方描述如下：

> - 为了解决这些挑战，我们提出引入 \`Request Interceptor\` —— 中间件的补充解决方案，它在源处运行代码，与页面、服务器操作或路由处理程序在同一进程中。
> 
> - 拦截器定义在 \`interceptor.ts\` 文件中，这些文件可以放置在 \`app\` 目录的任何位置。它们可以嵌套并对齐您的路由文件结构。
> 
> - 一个拦截器导出一个默认的异步函数，该函数接收一个 NextRequest 对象




我们要注意到，这次引入的拦截器是跟主进程同一进程的完整的\`nodeRuntime\`，所以我们能够完成上面无法解决的挑战，我们可以畅享未来的拦截器都能是实现什么问题：

1. 通过嵌套路由文件系统，可以对不同的目录轻松实践不同的拦截器，这就可以轻松的完成\`RBAC\`权限验证
2. 拦截器中使用\`database-session\` 机制，就可以完成在服务端控制用户在线状态的管理
3. 能够统一日志请求的记录，轻松记录所有页面访问信息到数据库
4. 还可以跟\`middleware\`进行混合使用，可以先在\`middleware\`先进行\`cookie\`判断，通过后再传递给\`interceptor\`，降低数据库的压力
5. 由于支持嵌套路由，那么也能享受到\`layout.tsx\`和\`loading.tsx\`带来的页面交互体验的提升
    `
md2pdf(content,{as_html:true});
