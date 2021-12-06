---
title: 数组常见手写面试题
date: 2021-12-5
categories:
 - JavaScript
tags:
 - JS 面试相关
sticky: 1
---



# 数组去重

## 使用集合（Set）

> Set主要特性是允许你存储任何类型唯一值，无论是原始值或者是对象引用，不会出现重复的值;
>
> Array.from函数，里面的参数可以放一个伪数组，并将改伪数组转换为一个真数组;

```js
function uniqueArray(arr = []) {
  return Array.from(new Set(arr));
}
```



## 使用数组reduce方法

> 数组reduce方法里面传入的第一个参数数回调函数，第二个参数是初始值，如果不传第二个参数，则初始值默认为数组索引为0的值；回调函数的第一个参数是上一个返回的值，默认第一次为reduce方法第二个参数的初始值，第二个参数是当前遍历的值，第三个参数则是索引值，第四个参数是当前遍历的数组

```js
function uniqueArray(arr = []) {
  return arr.reduce((prev, current, index, array) => {
    // 查找 prev 数组是否包含 current 值，不包含则 push 到 prev 数组中，否则直接返回 prev
    if (!prev.includes(current)) {
      prev.push(current);
      return prev;
    } else {
      return prev;
    }
  }, [])
}
```



## 使用数组filter方法

> 数组filter方法会返回一个新的数组，主要是过滤回调函数返回的条件的项

```js
function uniqueArray(arr = []) {
  // 使用一个缓存池记录保存的值
  const cache = {};
  return arr.filter((value) => {
    // 如果缓存池有该值，则会被过滤掉
    if (!cache[value]) {
      cache[value] = true;
      return true
    }
  });
}
```



## 使用数组forEach方法

> 思路：在外声明一个新数组，遍历传进来的数组，如果新数组不包含遍历的值，则添加遍历的值到新数组里

```js
function uniqueArray(arr = []) {
  const result = [];
  arr.forEach((value) => {
    if (!result.includes(value)) {
      result.push(value);
    }
  })
  return result;
}
```



# 数组方法map、filter、reduce等原理

## map

```js
Array.prototye.fakeMap = function(cb, ctx) {
  let len = this.length;  // 数组的长度
  let context = ctx ? ctx : window;  // 回调函数的this指向，默认为window
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(cb.call(context, this[i], i, this));
  }
  return arr;
}
```



## filter

```js
Array.prototye.fakeFilter = function(cb, ctx) {
  let len = this.length;  // 数组的长度
  let context = ctx ? ctx : window;  // 回调函数的this指向，默认为window
  let arr = [];
  for (let i = 0; i < len; i++) {
    // 如果回调函数执行的结果为true，则push这一项的值
    cb.call(context, this[i], i, this) && arr.push(this[i]);
  }
  return arr;
}
```



## reduce

```js
Array.prototype.fakeReduce = function(cb, initialValue) {
  let len = this.length,
      i,
      nextValue;
  if (initailValue) {
    nextValue = initialValue;
    i = 0;
  } else {
    nextValue = this[0];
    i = 1;
  }
  
  for (; i < len; i++) {
    nextValue = cb(nextValue, this[i], i, this);
  }
  return nextValue;
}
```



## forEach

```js
Array.prototype.fakeForEach = function(cb, ctx) {
  let len = this.length;
  let context = ctx ? ctx : window;
  for (let i = 0; i < len; i++) {
    cb.call(context, this[i], i, this);
  }
} 
```



# 数组扁平化flat

## 封装函数方法写法

### 不设置扁平层数

#### 普通写法

```js
function flatten (arr = []) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```



#### reduce写法

```js
function flatten (arr = []) {
  return arr.reduce((prev, cur) => {
    return prev.concat(
    	Array.isArray(cur) ? flatten(cur) : cur
    );
  }, [])
}
```



### 设置扁平层数

```js
function flat(arr = [], dep = 1) {
  return dep > 0 ?
    arr.reduce((prev, cur) => {
    	return prev.concat(
      	Array.isArray(cur) ? flat(cur, --dep) : cur
      )
  	}, []) :
  arr.slice();
}
```



## 在数组原型的写法

```js
Array.prototype.fakeFlat = function(dep = 1) {
  if (!Number(dep) || Number(dep) < 0) {
    return this;
  }
  
  return dep > 0 ?
    this.reduce((prev, cur) => {
			return prev.concat(
      	Array.isArray(cur) ? cur.fakeFlat(--dep) : cur
      )
  	}, []) :
  	this.slice();
}
```

