## 鼠标拖拽Demo

>##### 最近的学习计划是对原生js的学习，这两天在复习DOM操作的相关知识。(还是觉得jquer对DMO的操作方便多了，不用考虑各种兼容性的写法，也不用自己写一大段代码来实现对元素的查找。)

-------------------------------------------

>#### dragDemo是原生js写的一个简易的鼠标弹窗拖拽功能，应该很多场景下都有类似的这个功能，例如登录注册弹窗等，都支持对弹窗任意拖拽位置。

##### 参数  

|参数|说明|是否必选|
|----|----|----|
|dragWrap|拖拽容器|是|
|dragableArea|可拖拽区域|否|
|isDrag|是否可拖拽，拖拽开关|否|
|isDummyWrap|是否需要虚拟拖拽框|否|
|dummyWrapClass|控制虚拟拖拽框的样式|否|

##### 如何使用  

 如果想让一个弹窗能够支持拖拽，只需要调用拖拽控件，配置相应的参数即可使用。如下调用方式：

	new DragView({
	   "dragWrap": document.getElementById("drag_wrap"),    //容器，必选
	   "dragableArea": document.getElementById("drag_area"),  //可拖拽区域，可选
	   "isDrag": true,  //是否可拖拽，可选
	   "isDummyWrap": true, //是否需要虚拟拖拽框，可选
	   "dummyWrapClass": "dragview_dummy_wrap2" //控制虚拟拖拽框的样式，可选
	})

### 如果喜欢，请记得Star哈！