;(function(window,document){
    var eventUtil = {
    	/*getElement: function(opt,element){
    		var allTag = element!=undefined?element.getElementsByTagName("*"):document.getElementsByTagName("*");
    		var eles = [];
	    	for(var i=0,l=allTag.length; i<l; i++){
	    		if(allTag[i].getAttribute(opt)){
	                eles.push(allTag[i]);
	    		}
	    	}
	    	return eles;
    	},
    	getContentElement: function(m){
    		return this.getElement(m);
    	},
    	getDragElement: function(m,element){
    		return this.getElement(m,element);
        },*/
        getEvent: function(e){
        	return e ? e : window.event;
        }
    };
    var Drag = function(){
        this.contentElement = "";
        this.dragElement = "";
        this.isDrag = true;
    }
    Drag.prototype.mouseDown = function(e,option){
    	var that = this;
        that.contentElement = option.contentElement;
        that.dragElement = option.dragElement;
        var events = eventUtil.getEvent(e);
        var disX = events.clientX - that.contentElement.offsetLeft;
        var disY = events.clientY - that.contentElement.offsetTop;
        that.contentElement.style.position = "absolute";
        that.contentElement.style.zIndex = "99999";
        that.isDrag = true;
        document.onmousemove = function(e){
        	var _events = eventUtil.getEvent(e);
        	that.mouseMove(_events,disX,disY);
        }
        document.onmouseup = function(){
            that.mouseUp();
        }
    }
    Drag.prototype.mouseMove = function(_events,disX,disY){
        if(this.isDrag){
        	var _x = _events.clientX - disX;
        	var _y = _events.clientY - disY;
            var _winW = document.documentElement.clientWidth || document.body.clientWidth;
            var _winH=document.documentElement.clientHeight || document.body.clientHeight;
            var option = {
                "x": _x,
                "y": _y,
                "winX": _winW,
                "winY": _winH,
                "dragW": this.contentElement.offsetWidth,
                "dragH": this.contentElement.offsetHeight 
            };
            this.limiteRange(option);
        }
    }
    Drag.prototype.mouseUp = function(){
        this.isDrag = false;
    }
    Drag.prototype.limiteRange = function(option){
        //document.title = option.x + "," + option.y;
        if(option.x <= 0){
            this.contentElement.style.left = "0px";
        }else if((option.x + option.dragW) >= option.winX){
            this.contentElement.style.left = (option.winX - option.dragW) + "px";
        }else{
            this.contentElement.style.left = option.x + "px";
        }

        if(option.y <= 0){
            this.contentElement.style.top = "0px";
        }else if((option.y + option.dragH) >= option.winY){
            this.contentElement.style.top = (option.winY - option.dragH) + "px";
        }else{
            this.contentElement.style.top = option.y + "px";
        }
    }
    //var contents = eventUtil.getContentElement("data-drag-content");
    var Drags,contentElement,dragElement;
    /*for(var k=0,c=contents.length; k<c; k++){
    	Drags = new Drag();
        contentElement = contents[k];
        dragElement = eventUtil.getDragElement("data-drag",contents[k])[0];
    	dragElement.onmousedown =  function(e){
            Drags.mouseDown(e,{"contentElement": contentElement,"dragElement": this});
        }
    }*/
    Drags = new Drag();
    $("[data-drag]").mousedown(function(e){
        Drags.mouseDown(
            e,{"contentElement":$(this).parents("[data-drag-content]").get(0),"dragElement":this});
    })
})(window,document)