# 欢迎来到TkJS

这是一个免费，轻量的开源API。

你是否也遇到过这些问题？

 想写一个web网页，但不会html。

 想快速搭建个网页，不想搬VUE或react等重型框架。

 想要一个类似于Python Tkinter那样简单直观的写法。

TkJS就是这样的一个API.

**什么是TkJS?**

**TkJS是一个JavaScript DOM API.**为了轻便而存在。我们不需要下载到本地，也不需要npm，只需要

<script src="https://tkjsapi.github.io/api/tkjs/tkinterjs.js"></script>
一行代码即可应用.

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

接着我们需要用html应用

方法1（用script标签）：

```html
<!DOCTYPE html>
<html>
    <body>
        <script src="https://tkjsapi.github.io/api/tkjs/tkinterjs.js"></script>
        <!--引入,必须在body中-->
        
        <script>
        	let root = tk.Tk();
            //...
            //实现你的逻辑
        </script>
        <!--逻辑，必须在body中-->
    </body>
</html>
```

方法2(本地文件)：

```javascript
//文件1：index.js(可以换成别的路径)
let root = tk.Tk();
//...
//实现你的逻辑
```

```html
<!DOCTYPE html>
<html>
    <body>
        <script src="https://tkjsapi.github.io/api/tkjs/tkinterjs.js"></script>
        <script src="./index.js"></script>
        <!--换成你的路径-->
    </body>
</html>
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



# TkStyle (第2课)

目标

学会基本的tkStyle方法



所用API

`tkinterjs.js/tkStyle/BackgroundColor(element,color)`

`tkinterjs.js/tkStyle/FontColor(element,color)`

`tkinterjs.js/tkStyle/BorderRadius(element,sizepx)`



## BackgroundColor

用于设置背景颜色



### 参数:element

受作用的元素

```javascript
let root=tk.Tk();
//root可以作为element的参数
tkStyle.Background(root,"black");
//将窗口背景设置为黑色
```

### 参数:color

受作用的元素的背景颜色



#### Tips：颜色编码

##### RGB颜色模式

R：红色

G：绿色

B：蓝色

RGB代表一个颜色拆解后3种颜色的量

通常我们会将R,G,B三种颜色的最大值当成255(即ff_16)



##### 十六进制表示

每一个十六进制颜色编码的开头必须是#(表示十六进制颜色编码，否则不会加载)。

后面加上3个十六进制2位数（比如00,1a,ff,b5)(0-9,a,b,c,d,e,f)，数字越大，就越偏向于这个颜色。



##### 常用颜色

| 颜色 | 编码      | 说明               |
| :--- | :-------- | :----------------- |
| 黑色 | `#000000` | 所有通道为 0       |
| 白色 | `#ffffff` | 所有通道为最大值   |
| 红色 | `#ff0000` | 红色拉满，绿蓝为 0 |
| 绿色 | `#00ff00` | 绿色拉满           |
| 蓝色 | `#0000ff` | 蓝色拉满           |
| 紫色 | `#7a5cff` | 混合色             |



##### RGB函数表示

这个表达方法只作用于JavaScript,CSS,html

`rgb(r,g,b)`

r,g,b必须是`>=0`,`<=255`的整数。



##### 16进制和10进制的互换

###### 16 -> 10

举个例子，将f670_16转换成_10
$$
0×16^0+7×16^1+6×16^2+15×16^3 = 63088_{10}
$$

###### 10->16

举个例子,将63088_10转换成_16
$$
第一步:\quad63088\div16 = 3943 \cdots 0\\
第二步:\quad3943\div16=246 \cdots7\\
第三步:\quad246\div16=15\cdots6\\
第四步:\quad15\div16=0\cdots15(f)\\
(0,7,6,f)倒序后\\
(f,6,7,0)\\
结果为f670\\
所以f670_{16}=63088_{10}
$$


## FontColor

用于设置字体颜色



### 参数:element

受作用的元素



### 参数:color

受作用的元素的设置颜色



### 示例代码

```javascript
let root = tk.Tk();

let lab = tk.Label(root,"_classname_lab","_id_lab","一段平平无奇的文本");//定义文本

tkStyle.BackgroundColor(lab,"#000000");//十六进制颜色编码,表示黑色
tkStyle.FontColor(lab,"#ffffff");//十六进制颜色编码,表示白色
```



## BorderRadius

用于设置圆角



### 参数:element

受作用的元素



### 参数:圆角大小

受作用的元素圆角大小



### 示例代码

```javascript
let root = tk.Tk();

let btn = tk.Button(root,"_classname_btn","_id_btn","点我",function(){
    console.log("hello tkjs!");
});//定义按钮

tkStyle.BackgroundColor(btn,"#000000");//十六进制颜色编码,表示黑色
tkStyle.FontColor(btn,"#ffffff");//十六进制颜色编码,表示白色
tkStyle.BorderRadius(btn,12);
```

