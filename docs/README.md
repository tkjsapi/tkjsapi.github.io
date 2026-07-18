# 欢迎来到TkJS

这是一个免费，轻量的开源API。

你是否也遇到过这些问题？

 想写一个web网页，但不会html。

 想快速搭建个网页，不想搬VUE或react等重型框架。

 想要一个类似于Python Tkinter那样简单直观的写法。

TkJS就是这样的一个API.

**什么是TkJS?**

**TkJS是一个JavaScript DOM API.**为了轻便而存在。我们不需要下载到本地，也不需要npm，只需要

<script src="https://tkjsapi.github.io/api/tkjs/tkinterjs.js"></script>一行代码即可应用.

# Hello world程序（第0课）

目标

用TkJS写出第一个TkJS程序（显示“hello world”）



所用API

`tkinterjs.js/tk/Tk()窗口组件`

`tkinterjs.js/tk/Label(master,class_,id,text)文本组件`



定义你的的一个窗口吧



```
let root = tk.Tk(); //窗口

tk.title("Hello world"); //标题

let lab = tk.Label(root,"_class_name","id_name","hello world");

//创建一个文本，等同于

//<p class="_class_name" id="id_name">hello world</p>

//其中 root等同于document.body


```

你学会了吗?

# Button (第1课)

目标

写出一个带有样式的Button



所用API

`tkinterjs.js/tk/Tk()`

`tkinterjs.js/tk/Button(master,class_,id,text,onclick)`

`tkinterjs.js/tkStyle/BackgroundColor(element,color)`

`tkinterjs.js/tkStyle/FontColor(element,color)`



没错，有一个叫tkStyle的API用于控制样式。详细文档详见TkStyle。



首先让我们定义一个按钮

```javascript
let root = tk.Tk();//窗口

let btn = tk.Button(root,"class_btn","id_btn","click me!",function(){ //基本参数
    alert("clicked!"); //点击事件
});
```



等同于

`<button class="class_btn" id="id_btn" onclick="alert('clicked')">click me!</button>`



接下来，让我们加入样式，让按钮变成黑色的。

```javascript
let root = tk.Tk();//窗口

let btn = tk.Button(root,"class_btn","id_btn","click me!",function(){ //基本参数
    alert("clicked!"); //点击事件
});

tkStyle.BackgroundColor(btn,"#000000");//背景颜色 -> 黑色
tkStyle.FontColor(btn,"#ffffff")//字体颜色 -> 白色
```

同理，你可以将#000000,#ffffff换成其他颜色，我就不再赘述。

你学会了吗？
