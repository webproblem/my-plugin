> **参数**

**message:** 弹窗区域内容，参数类型为String类型。

**showTime:** 弹窗显示时长，参数类型为Number类型。

**skin:**  弹窗区域自定义皮肤，参数类型为String类型，用于扩展弹窗区域的样式，其值会被扩充为弹框的class，比如你想给弹窗换掉默认背景色，换成自己定义的颜色，就可以先在样式文件中定义好一个class样式，然后skin值为定义的class值就可以了，用法如下：

	dialogView.open({
		type: "msg",
		message: "我是提示类型框",
		shade: false,
		skin: "dialog-msg" //自定义的class样式
	})
项目的css文件下定义dialog-msg样式：

    .mobile-dialogView .dialogView-m-main .dialog-msg{background-color:blue;}
效果如下：
![demo-img](http://upload-images.jianshu.io/upload_images/1501715-3ddd9ac7e4c76bc2.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**shade:** 是否需要遮罩层，参数类型为Boolean值。

**shadeClose:** 点击弹窗以外的区域是否关闭弹窗，参数类型为Boolean值。

**closeable:** 点击button按钮是否关闭弹窗，参数类型为Boolean值，默认值是true，如有特殊情况点击按钮不需要关闭弹窗，将改值设置为false就可。

**animate:** 弹窗动画效果，定义了两种弹窗动画效果，值为“open”和"up"，第一种弹窗显示效果"open"，其对应的关闭效果是"close"，另一种弹窗显示效果"up"，其对应的关闭效果是"down"，默认动画效果为“open”。

**buttons:** 弹窗按钮，参数类型为Array值，

**title:** 自定义标题区域，参数类型为Object键值对类型，有两个参数，一个参数是content，对应的值为自定义标题内容，另一个是参数是styles，对应的值是为自定义标题添加的样式，用法如下：

	dialogView.open({
		title: {
			content: "<span>我是自定义标题</span>"
		}
	})


![demo-img.PNG](http://upload-images.jianshu.io/upload_images/1501715-b3281e0cf5c0a470.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)