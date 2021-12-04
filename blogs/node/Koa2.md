---
title: 从Node基础到Koa2框架
date: 2021-09-15
categories:
 - Node
tags:
 - Node.js
sticky: 1
---

# 一、Node.js

## 1.1 http模块

> 使用 Node.js 快速建立一个服务器

```js
const http = require('http');

// 端口号
const PORT = 5000

// 创建一个服务
// req 是客户端请求的对象，res 是服务端向客户端响应的对象
const app = http.createServer((req, res) => {
    res.write('<h1>Hello World!</h1>')
    res.end()
})

// 监听服务器开启的端口
app.listen(PORT, () => console.log(`服务器运行在: http://localhost:${PORT}`))
```



## 1.2 使用 nodemon

> 使用 nodemon 可以对 js 文件进行自动热监听，无需再保存文件然后使用 node index.js 命令重新开启服务器，这对我们开发阶段是非常友好

- 首先在项目根目录下生成 package.json 文件

  ```
  npm init -y
  ```

- 下载 nodemon 依赖包

  ```
  // 使用全局下载
  npm i -g nodemon
  ```

- 在 package.json 文件的 scripts 中添加如下配置

  ```json
  {
    ...,
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node index.js",
      "dev": "nodemon index.js"
    },
    ...
  }
  ```



## 1.3 path模块

> path 主要分为如下三个模块：

- 路径相关
- 文件相关
- 路径解析

### 1）路径相关

- normalize：用于规范化给定的path

  ```js
  const path = require('path')
  const str = path.normalize('/usr//demo////de//adds')
  console.log(str) // 结果： /usr/demo/de/adds
  ```

- join：将所有给定的path片段连接在一起

  ```js
  const path = require('path')
  // 结果：router/demo/test
  console.log(path.join('router', 'file', '../demo', 'test'))
  ```

- resolve：解析为绝对路径

  ```js
  const path = require('path')
  // 结果：/Users/lewin/vscode-workspace/koa-study/demo/test
  console.log(path.resolve(__dirname, 'test'))
  ```

- isAbsolute：检查当前path是否为绝对路径

### 2）文件相关

- basename：返回路径中最后一部分的文件名

  ```js
  const path = require('path')
  // 结果：user.js
  console.log(path.basename('/test/abc/user.js'))
  ```

- extname：返回路径最后文件名的扩展名

  ```js
  const path = require('path')
  // 结果：.js
  console.log(path.extname('/test/abc/user.js'))
  ```

- dirname：返回path路径中的目录名

  ```js
  const path = require('path')
  // 结果：/test/abc
  console.log(path.dirname('/test/abc/user.js'))
  ```

### 3）路径解析

- parse：返回一个对象，其属性表示 path 的有效元素

  ```js
  const path = require('path')
  /* 结果：
  {
    root: '/',
    dir: '/test/abc',
    base: 'user.js',
    ext: '.js',
    name: 'user'
  }
  */
  console.log(path.parse('/test/abc/user.js'))
  ```

- format：把对象转为一个路径字符串，跟 parse 是相反的



## 1.4 fs模块（文件系统）

>  使用 fs 我们可以读写一个文件内容，可以对文件进行操作

- 读取模块

  - 同步读取

    ```js
    const fs = require('fs')
    // 返回的是二进制流数据
    const data = fs.readFileSync('./abc.txt')
    // 使用 toString() 打印文字
    console.log(data.toString())
    ```

  - 异步读取

    ```js
    const fs = require('fs')
    
    // 异步读取
    fs.readFile('./abc.txt', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('异步读取：', data.toString())
    })
    ```

- 写入模块

  - 同步写入

    ```js
    const fs = require('fs')
    fs.writeFileSync('./abc.txt', '使用同步写入的')
    ```

  - 异步写入

    ```js
    const fs = require('fs')
    fs.writeFile('./abc.txt', '使用异步写入的', (err) => {
        if (err) {
            return console.error(err)
        }
        console.log('写入完毕')
    })
    ```



## 1.5 Buffer 模块

- Buffer 在全局作用域类中
- 主要是二进制数据类型



## 1.6 events 事件触发器

> Events Bus，事件监听和触发

```js
const EventEmitter = require('events')

class CustomEvent extends EventEmitter {}

const ce = new CustomEvent()

// 响应的事件处理函数 'test'
ce.once('test', () => {
    console.log('this is a test')
})

function say(str) {
    console.log(str)
}

ce.on('say', say)

ce.emit('say', 'hello')

// 每隔一秒触发一次事件处理函数 'test'
// setInterval(() => {
//     ce.emit('test')
// }, 1000)


// 只触发一次事件处理函数 'test'
setInterval(() => {
    ce.emit('test')
}, 1000)

// 移除事件
ce.removeListener('say', say)

// 移除所有事件
ce.removeAllListeners('test')
```



# 二、Koa2框架

##  2.1 koa2 安装

```
npm init -y
npm i -S koa
```

## 2.2 快速搭建web应用

> 在项目根目录新建 app.js 文件

```js
const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello World!'
})

app.listen(5000, () => console.log('服务器运行在: http://localhost:5000'))
```

## 2.3 脚手架搭建 koa 项目

### 1)安装全局依赖

```
npm i -g koa-generator
```

### 2)创建项目

```
koa2 [project name]
```

## 2.4 路由

> 路由存在的意义

- 处理不同的URL
- 处理不同的HTTP方法，如GET、POST
- 解析URL上的参数

### 1) 路由中间件koa-router

安装依赖：

```
npm i -S koa-router
```

### 2) 动态加载路由

> 新建一个文件夹routes作为路由管理，在该文件夹下新建index.js，作为动态加载的文件，这里使用 fs 获取当前目录下的文件除了index.js

```js
const fs = require('fs');

/**
 * 加载当前目录的路由文件，动态注册路由
 * @param {*} app 
 */
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return
        const route = require(`./${file}`)
        app.use(route.routes(), route.allowedMethods())
    })
}
```

> 然后在项目入口文件app.js下使用该函数

```js
...
const registerRoutes = require('./routes')

...

// 动态注册路由
registerRoutes(app);

```

> 现在只需要在routes文件夹下创建对应api的路由文件，比如 users.js

```js
const router = require('koa-router')();
const userController = require('../controllers/user');

router.prefix('/users');

router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.delete('/:id', userController.deleteById);
router.patch('/:id', userController.updateById);
router.post('/', userController.create);


module.exports = router
```



## 2.5 中间件（洋葱模型）

> 如下代码打印的结果是 1 => 2 => 3 => 2-1 => 1-1

```js
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1)
    await next()
    console.log('1-1')
    ctx.body = 'Hello World!'
})

app.use(async (ctx, next) => {
    console.log(2)
    await next()
    console.log('2-1')
})

app.use((ctx) => {
    console.log(3)
})

app.listen(5000, () => console.log('服务器运行在: http://localhost:5000'))
```



## 2.6 常用的 koa 插件

- koa-json-error：异常处理中间件
- koa-parameter：做参数校验
- koa-bodyparser：获取前端发送的请求体
- koa-router: 路由配置
- mongoose：连接mongdb数据库，并进行数据库的操作
- koa2-cors：解决跨域请求
- jsonwebtoken：生成 token 和验证 token
- koa-jwt：进行接口中的token判断中间件
- koa-multer：文件的上传



## 2.7 连接 mongodb 数据库

### 1) 安装依赖

```
npm i -S mongoose
```

### 2) 配置连接信息

> 在项目根目录下新建db文件夹，然后在index.js中配置连接信息

```
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/xxxxx", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((err) => {
      console.error("数据库连接失败", err);
    });
};

```

### 3) 在入口文件执行该函数

```js
...
const MongoConnect = require('./db')
...

// 连接数据库
MongoConnect()
```

### 4) 创建模型

> 在根目录下新建 models 文件夹，用于管理我们的数据模型，用于操作 mongodb 数据库

```js
const mongoose = require('mongoose')

// 用户模型对象规则
const userSchema = mongoose.Schema({
    username: String,
    pwd: String
});
const User = mongoose.model('users', userSchema);

module.exports = {
    User
}
```



## 2.8 划分 MVC 架构

> 前面我们连接了数据库，这就是模型层（M），视图层我们将使用前后端分离技术展示视图层（V），现在我们将使用控制层进行数据的操控，在不同的路由我们能对数据进行不同的操作，这就是（C）

### 1) 新建 controllers 目录

> 在该目录假如我们需要进行对用户的操作，我们新建一个user.js文件，然后这些方法我们可以在对应的路由进行不同操作，放入方法即可

```js
const { User } = require("../models");
const crud = require("./crud");

class UserController {
  // 添加
  async create(ctx) {
    const body = ctx.request.body;
    await crud.add(User, body, ctx);
  }

  // 删除
  async deleteById(ctx) {
    const id = ctx.params.id;
    await crud.remove(User, { _id: id }, ctx);
  }

  // 修改
  async updateById(ctx) {
    const id = ctx.params.id;
    const params = ctx.request.body;
    await crud.update(User, { _id: id }, params, ctx);
  }

  // 查询
  async findAll(ctx) {
    await crud.find(User, null, ctx);
  }

  // 根据id查询
  async findById(ctx) {
    const id = ctx.params.id;
    await crud.findOne(User, { _id: id }, ctx)
  }
}

module.exports = new UserController(User);
```



### 2) 封装 crud

> 上面的 user 控制器之所以这么简洁是因为我们对基本的增删改查操作进行了封装，这是以 mongoose 的基础上进行的封装

```js
const { success, fail } = require('../utils')

/**
 * 用于查询所有数据的公共方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 */
const find = async (model, where, ctx) => {
  try {
    const result = await model.find(where);
    ctx.body = success('查询成功', result)
  } catch (error) {
    ctx.body = fail(error.message, 500)
    console.log(error);
  }
};

/**
 * 添加数据的公共方法
 * @param {*} model
 * @param {*} params
 * @param {*} ctx
 */
const add = async (model, params, ctx) => {
  try {
    const result = await model.create(params);
    if (result) {
      ctx.body = success('添加成功')
    } else {
      ctx.body = fail('添加失败')
    }
  } catch (error) {
    ctx.body = fail(error.message, 500)
    console.log(error);
  }
};

/**
 * 根据条件查询数据并删除数据的公共方法
 * @param {*} model
 * @param {*} id
 * @param {*} ctx
 */
const remove = async (model, where, ctx) => {
  try {
    const result = await model.deleteOne(where);
    if (result) {
      ctx.body = success('删除成功')
    } else {
      ctx.body = fail('删除失败')
    }
  } catch (err) {
    ctx.body = fail(error.message, 500)
    console.log(err);
  }
};

/**
 * 根据条件查询数据并更新数据的公共方法
 * @param {*} model
 * @param {*} id
 * @param {*} params
 * @param {*} ctx
 */
const update = async (model, where, params, ctx) => {
  try {
    const result = await model.updateOne(where, params);
    if (result) {
        ctx.body = success('修改成功')
    } else {
        ctx.body = fail('修改失败')
    }
  } catch (err) {
    ctx.body = fail(error.message, 500)
    console.log(err);
  }
};

/**
 * 根据条件查询一条数据的公共方法
 * @param {*} model 
 * @param {*} where 
 * @param {*} ctx 
 */
const findOne = async (model, where, ctx) => {
  try {
    const result = await model.findOne(where);
    if (result) {
      ctx.body = success('查询成功', result)
    } else {
      ctx.body = success('没有该数据', null, 404)
    }
  } catch (error) {
    ctx.body = fail(error.message, 500)
    console.log(error);
  }
};

module.exports = {
  find,
  add,
  remove,
  update,
  findOne
};
```



## 2.9 jwt 技术进行权限认证

### 1）安装依赖

```
npm i -S jsonwebtoken koa-jwt
```

