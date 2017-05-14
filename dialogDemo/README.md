### 移动端dialog组件

dialogView是满足移动端下，用户自定义的dialog组件，API可扩展性强，使用便捷。现版本是基于jquery库编写的，在使用之前需要引入jquery库或者Zepto库，后续将会和其他组件整合成一个轻量级UI组件库中。

> **引用**

页面引入dialog.min.js和dialog.min.css

> **使用讲解**

组件提供了一个全局**dialogView**接口，和一个**open()**主函数，使用的时候只需要dialogView.open()就可以了。

dialogView提供了常用的几种移动端dialog类型：**alert，confirm，msg，footConfirm，footMsg**。对前3种常用类型的dailog弹窗，暴露出了3个函数，便于使用，如dialogView.alert()，dialogView.confirm()和dialogView.msg()，三个函数拥有默认的类型值，所以使用这三个函数时不需要传入type值，当然也可以这样使用：dialogView.open({type:"alert"})，dialogView.open({type:"confirm"})，dialogView.open({type:"msg"})。

dialogView支持链式调用，如：dialogView.alert({message: "alert默认信息框"}).open({type:"footMsg",message: "我是提示类型框"})。

并且还暴露出了一个close()函数，用于关闭弹窗，使用如下：dialogView.close()，close()函数只支持传入一个参数，即需要关闭的弹窗的DOM元素，不传参时，将会默认关闭页面上所有的弹窗。

> **参数**

**message:** 弹窗区域内容，参数类型可以是String类型，也可以是DOM对象。

**type:** 弹窗类型，参数类型为String类型，提供了5种默认的类型：**alert，confirm，msg，footConfirm，footMsg**，弹窗类型值可供用户自行扩展。

**showTime:** 弹窗显示时长，参数类型为Number类型。

**className:** 自定义class名，参数类型为String类型，会在弹窗的最外层元素上扩展class，一般用于特殊情况下使用。

**skin:**  弹窗区域自定义皮肤，参数类型为String类型，用于扩展弹窗区域的样式，其值会被扩充为弹框的class，比如你想给弹窗换掉默认背景色，换成自己定义的颜色，就可以先在样式文件中定义好一个class样式，然后skin值为定义的class值就可以了，用法如下：

	dialogView.open({
		type: "msg",
		message: "我是提示类型框",
		shade: false,
		skin: "dialog-msg" //自定义的皮肤样式
	})
项目的css文件下定义dialog-msg样式：

    .mobile-dialogView .dialogView-m-main .dialog-msg{background-color:blue;}
效果如下：
![demo-img](http://upload-images.jianshu.io/upload_images/1501715-3ddd9ac7e4c76bc2.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**styles:** 弹窗区域添加自定义css样式,与skin值得作用一致，不同的是skin参数值的自定义css样式是定义在样式文件中的，而styles值则是直接扩展到行内样式中，如：

	dialogView.open({
		type: "footmsg",
		animate: "up",
		message: $("#info").show() || document.getElementById("info"),
		styles: "position: fixed;height: 100%;width: 100%;padding: 0;bottom: 0px;opacity: 1;", //自定义css样式，将直接扩展为行内样式
		showTime: 3000
	})

**shade:** 是否需要遮罩层，参数类型为Boolean值。

**shadeClose:** 点击弹窗以外的区域是否关闭弹窗，参数类型为Boolean值。

**closeable:** 点击button按钮是否关闭弹窗，参数类型为Boolean值，默认值是true，如有特殊情况点击按钮不需要关闭弹窗，将改值设置为false就可。

**animate:** 弹窗动画效果，定义了两种弹窗动画效果，值为“open”和"up"，第一种弹窗显示效果"open"，其对应的关闭效果是"close"，另一种弹窗显示效果"up"，其对应的关闭效果是"down"，默认动画效果为“open”。

**buttons:** 弹窗按钮组，参数类型为Array值，当dialog类型是alert时，有且只允许添加一个按钮，当dailog类型值是confirm或者footConfirm时，有且只允许添加两个按钮，当dailog类型值是msg或者footMsg时，不会添加任何按钮，其他dailog类型，用户写了多少按钮，就往按钮组添加多少按钮。
按钮的参数类型为Object键值对类型，有以下几种参数：
* text: 按钮文字，参数类型可以是String类型
* skin: 自定义按钮皮肤，使用如上面所述
* callback: 回调函数，点击按钮时触发
* closeable：参数类型为Boolean值，用于判定按钮点击之后是否关闭弹窗，默认值为true。

使用如下：

	dialogView.confirm({
		message: "要前往我的github吗？",
		buttons: [{
			skin: "yes",
			text: "可以",
			callback: function(){
				window.location.href="https://github.com/webproblem";
			}
		},{
			skin: "no",
			text: "不要"
		}]
	})

**注：** 在弹窗里的DOM元素上添加closeable=true属性，点击该DOM元素时会触发事件关闭弹窗，比如在自定义的标题上添加一个关闭按钮图标，使其点击时触发关闭事件，可以这样使用：

	dialogView.open({
		title: {
			content: "<span>我是自定义标题</span><i class='demo-title-close' closeable=true></i>"
		},
		message: "自定义风格标题,第一个参数为标题内容,第二个参数为自定义的样式,<br>关闭按钮是自定义加上去的哦！"
	})

**title:** 自定义标题区域，参数类型为Object键值对类型，有三个参数，一个参数是content，对应的值为自定义标题内容，参数类型可以是String类型，也可以是DOM对象。另两个参数是styles和skin，都是为自定义标题添加的样式，两个参数的区别如上面所述的一样。用法如下：

	dialogView.open({
		title: {
			content: "<span>我是自定义标题</span>"
		}
	})


![demo-img.PNG](http://upload-images.jianshu.io/upload_images/1501715-b3281e0cf5c0a470.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


Demo示例效果预览地址: [https://webproblem.github.io/hello-world/dialogDemo/dialog.html](https://webproblem.github.io/hello-world/dialogDemo/dialog.html)
<<<<<<< HEAD

**如果喜欢，请记得Star哈！**
=======
>>>>>>> 2cd3f003c5fc900dfc00c5103a9849ea81f78d2b

**如果喜欢，请记得Star哈！**

**如有不对之处，欢迎及时指出！**
