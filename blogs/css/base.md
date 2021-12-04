---
title: CSS 基础知识
date: 2020-05-29
categories:
 - CSS
tags:
 - css
---

# CSS 权重

**基于样式表（渲染优先级）：** 内联样式 > 内部样式表 > 外部样式表

**基于选择器（渲染优先级）：**!important > id 选择器 > 类选择器 | 属性选择器 > 标签选择器 > 通配符选择器

**权重值**：

| 名字                       | 权重值 |
| -------------------------- | ------ |
| * 通配符                   | 0      |
| 标签、伪元素               | 1      |
| 类选择器、属性选择器，伪类 | 10     |
| id 选择器                  | 100    |
| 内联样式                   | 1000   |
| !important                 | 正无穷 |



# CSS 选择器

## id 选择器

书写规则：

- 以 # 符号开头，后面紧跟着 id 名
- id 名是唯一的，不能有命名冲突

```html
<style type="text/css">
    #box {
        width: 100px;
        height: 100px;
        background-color: red;
    }
</style>

<div id="box"></div>
```



## 类选择器

书写规则：

- 以 . 符号开头，后面紧跟着类名
- 一个类样式可以应用在多个标签上（即命名没有唯一性）

```html
<style type="text/css">
    .box {
        width: 100px;
        height: 100px;
        background-color: blue;
    }
</style>

<div class="box"></div>
<div class="box"></div>
```



## 标签选择器

书写规则：

- 根据标签名而书写
- 一般用于初始化默认标签样式

```html
<style type="text/css">
    body {
    	margin: 0;
    }
    h1 {
        font-weight: normal;
    }
</style>

<body>
    <h1>haha</h1>
	<h2>hehe</h2>
</body>

```



## 通配符选择器

书写规则：

- 一个 * 符号
- 匹配所有的标签，并能改变所有的标签样式
- 一般也是用于初始化样式使用

```html
<style type="text/css">
    * {
    	box-sizing: border-box;
        margin: 0;
        padding: 0;
    }	
</style>

```



## 属性选择器

书写规则：

- 是根据标签的属性进行匹配
- [key="value"]，中括号括起来，里面匹配标签的属性，如 [id="box"]

```html
<style type="text/css">
    /* 这里只会匹配到 id="box"，不会匹配到 id="box1" */
    [id="box"] {
        width: 100px;
    	height: 100px;
        background-color: pink;
    }
    
    [href] {
        text-decoration: none;
    }
</style>

<body>
    <div id="box"></div>
	<div id="box1"></div>
    
    <a href="xxxx">xxxx</a>
</body>

```



## 后代选择器

书写规则：

- 不能同时出现多个 id 选择器，只能有一个 id 选择器
- 根据 html 结构选择要改变样式的类样式、标签样式等
- 匹配规则：从右到左进行匹配，DOM树中是从下到上（性能更好）

```html
/* 要求只改类名 inner 下的 em 标签的样式 */
<style type="text/css">
    .content .inner em {
        color: red;
    }
</style>

<body>
    <div class="content">
        <div class="inner">
            <em>hello world</em>
        </div>
        <em>7777</em>
    </div>
</body>
```



## 并列选择器

书写规则：

- 相当于做了与运算
- 比如：.box.active

```html
<style type="text/css">
    .box {
        width: 100px;
        height: 100px;
    }
    
    .large-box {
        width: 200px;
        height: 200px;
    }
    
    .box.box1 {
        background-color: red;
    }
     .box.box2 {
        background-color: blue;
    }
     .large-box.box1 {
        background-color: yellow;
    }
     .large-box.box2 {
        background-color: pink;
    }
</style>

<body>
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="large-box box1"></div>
    <div class="large-box box2"></div>
</body>
```



## 分组选择器

书写规则：

- 选择一些标签或者类样式进行书写它们的共同样式
- 每选择一项用逗号隔开，比如：.box1, .box2, .box3 {}

```html
<style type="text/css">
	input,
    textarea {
        outline: none;
    }
</style>

<body>
    <input type="text" />
    <textarea cols="30" rows="10"></textarea>
</body>
```



# CSS 对齐方式

## 垂直居中

**行内块元素和行内元素：**在行内块元素使用 vertical-align: top | middle | bottom | 像素；

**多行文本垂直居中的方法：**

1. 将容器的 display 设置成 table 
2. 将容器内的文本的 display 设置成 table-cell（表格单元格属性）
3. 在容器中设置 vertical-align 设置成 middle