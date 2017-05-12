;!(function(win,doc,undefined){
	var _dialogView = dialogView;
	var commonsPart = {
		isObject: function(data){
			return data && typeof data==='object' && Object == data.constructor;
		},
		isArray: function(data){
			return data && typeof data==='object' && Array == data.constructor;
		},
		isFunction: function(data){
			return data && typeof data =="function" && Function == data.constructor;
		},
		isEmptyObject: function(data,clearData){
			for (var key in data) {
			    if(key!=clearData)
			        return false;
			}
			return true;
		},
		isDom: function(data){
			if(!data) return false;
			if(data && data instanceof jQuery) return data[0].outerHTML;
			if(data instanceof HTMLElement || (typeof data === 'object' && data.nodeType === 1 && typeof data.nodeName === 'string')) return data.outerHTML;
			return data;
		}
	};
	var dialogView = {
		"version": "0.0.1",
		"author": "yqx_cn",
		"github:": "https://github.com/webproblem",
		"index": 0,
		"type": ["alert","confirm","msg","footConfirm","footMsg"],
		"open": function(options){
			DialogViewPro(options);
			return this;
		},
		"alert": function(options){
			DialogViewPro($.extend({}, {type: this.type[0]}, options));
			return this;
		},
		"confirm": function(options){
			DialogViewPro($.extend({}, {type: this.type[1]}, options));
			return this;
		},
		"msg": function(options){
			DialogViewPro($.extend({}, {type: this.type[2]}, options));
			return this;
		},
		"close": function(options){
			DialogViewPro.prototype.close(options);
			return this;
		}
	};
	var DialogViewPro = function(config){
		new DialogViewPro.prototype.init(config);
	}
	DialogViewPro.prototype = {
	    init: function(config) {
	        var _this_ = this;
			this.domCreat = null;this.domCache = null;this.isConfig = false;
			this.config = {
				title: null,                              //标题
	            area: null,                              //宽高
	            type: null,                              //类型
	            buttons: null,                           //按钮
	            message: null,                           //文字
	            showTime: null,                          //显示时间
	            skin: null,                              //皮肤定制
	            shade: true,                             //是否需要遮罩层
	            shadeClose: false,                       //点击遮罩层是否关闭弹窗
	            closeable: null,                         //点击按钮是否关闭弹窗
	            zIndex: 9999999,                         //默认z-index值
	            animate: "open",                         //默认动画
	            defaultText: "按钮",                     //默认按钮文字
	            defaultMsg: "欢迎使用",                  //默认文字
	            defaultTime: 3000                        //默认显示时间
			};
            if(commonsPart.isObject(config) && !commonsPart.isEmptyObject(config,"type")){
				this.isConfig = true;
			}
            this.config = $.extend({}, this.config, config);
	        this.creat();
	    },
	    creat: function(){
	    	var _this_ = this;
	    	var _body = $("body");
            var _config = this.config;
            var _domCreat = {},_domCache = {};
            ++dialogView.index;
            _config.zIndex += dialogView.index;
            _domCreat.shade = _config.shade ? '<div class="dialogView-m-shade" times="'+dialogView.index+'" style="z-index:'+_config.zIndex+'"></div>' : "";
            _domCreat.animate = _config.animate ? "dialogView-m-anim-"+_config.animate : "dialogView-m-anim-open";
            _domCreat.type = _config.type ? 'dialogView-m-'+_config.type : "";
            _domCreat.buttons = _config.buttons ? '<div class="dialogView-m-buttons"></div>' : "";
            _domCreat.styles = _config.styles ? _config.styles : "";
            _domCreat.message = _config.message ? commonsPart.isDom(_config.message) : "";
            if(!this.isConfig){
            	_domCreat.content = '<div class="mobile-dialogView" data-animate="'+_config.animate+'" times="'+dialogView.index+'">'+_domCreat.shade+'<div class="dialogView-m-main dialogView-m-aniamte '+_domCreat.animate+'" style="z-index:'+(_config.zIndex+1)+'"><div class="dialogView-m-section">' +
	                                '<div class="dialogView-m-wrap"><div class="dialogView-m-content">'+(_config.defaultMsg?_config.defaultMsg:"")+'</div></div></div></div></div>';
            }else{
	            _domCreat.content = '<div class="mobile-dialogView '+(_config.className?_config.className:"")+'" data-animate="'+_config.animate+'" times="'+dialogView.index+'">'+_domCreat.shade+'<div class="dialogView-m-main dialogView-m-aniamte '+_domCreat.animate+'" style="z-index:'+(_config.zIndex+1)+'"><div class="dialogView-m-section">' +
	                                '<div class="dialogView-m-wrap '+_domCreat.type+' '+(_config.skin?_config.skin:"")+'" style="'+_domCreat.styles+'"> '+this.titleUI()+' <div class="dialogView-m-content">'+_domCreat.message+'</div>' +
	                                ''+_domCreat.buttons+'</div></div></div></div>';
            }
            _body.append(_domCreat.content);
            _domCache = {
            	"view":    $(".mobile-dialogView[times="+dialogView.index+"]"),
            	"shade":   $(".mobile-dialogView[times="+dialogView.index+"] .dialogView-m-shade"),
            	"main":    $(".mobile-dialogView[times="+dialogView.index+"] .dialogView-m-main"),
            	"section": $(".mobile-dialogView[times="+dialogView.index+"] .dialogView-m-section"),
            	"wrap":    $(".mobile-dialogView[times="+dialogView.index+"] .dialogView-m-wrap"),
            	"content": $(".mobile-dialogView[times="+dialogView.index+"] .dialogView-m-content"),
            	"buttons": $(".mobile-dialogView[times="+dialogView.index+"] .dialogView-m-buttons")
            };
            this.isConfig 
            ? (_config.showTime && _domCache.view.attr("showTime",_config.showTime))
            : (_config.defaultTime && _domCache.view.attr("showTime",_config.defaultTime));
            commonsPart.isArray(_config.buttons) && this.buttonsUI(_config,_domCache);
            this.bindUI(_config,_domCache);
	    },
	    bindUI: function(_config,_domCache){
	    	var _this_ = this;
	    	//设置了showTime值就自动关闭
	    	_domCache.view.attr("showTime") && this.close(_domCache.view);
            //点击遮罩层自动关闭
            (function(){
            	_domCache.main.on("click",function(event) {
	            	(_config.shade && _config.shadeClose) && (function(){
	            		_this_.close($(this).parents(".mobile-dialogView"));
	            	}.bind(this))()
	            });
	            _domCache.wrap.on("click",function(e){e.stopPropagation();})
            })()
	    	
	    	_domCache.main.find("[closeable=true]").on("click",function(event){
        		this.close(_domCache.view,"eventClose");
        	}.bind(this))
	    },
	    titleUI: function(){
	    	var _title = this.config.title;
	    	if(commonsPart.isObject(_title)){
	    		return '<div class="dialogView-m-title '+(_title.skin?_title.skin:"")+'" style='+(_title.styles ? _title.styles : "")+'>'+commonsPart.isDom(_title.content)+'</div>';
	    	}else{return "";}
	    },
	    buttonsUI: function(_config,_domCache){ 
	    	var buttonsData = [];
	    	(function(){
	    		if(_config.type == dialogView.type[0]){buttonsData.push(_config.buttons[0]); return;}
	    		if(_config.type == dialogView.type[1] || _config.type == dialogView.type[3]){_config.buttons.splice(2,_config.buttons.length - 2);buttonsData = _config.buttons; return;}
	    		if(_config.type == dialogView.type[2] || _config.type == dialogView.type[4]){buttonsData = null; return;}
	    		buttonsData = _config.buttons;
	    	})()
	    	buttonsData && buttonsData.forEach(function(v,i){
        		var _skin = v.skin ? v.skin : "";
        		var _text = v.text ? v.text : _config.defaultText;
        		var _closeable = v.closeable!=undefined ? v.closeable : true;
                var buttonWrap = $("<span data-btn='button' closeable="+_closeable+" data-skin='"+_skin+"' class='"+_skin+"'>"+_text+"</span>");
        		_domCache.buttons.append(buttonWrap);
        		if(commonsPart.isFunction(v.callback)){
        			buttonWrap.click(function(){
        				v.callback();
        			})
        		}
        	})
	    },
	    close: function(view,closeType){
	    	var _view = view ? $(view) : $(".mobile-dialogView");
	    	var _showTime = closeType ? 0 : (view ? ($(view).attr("showTime")||0) : 0);
	    	setTimeout(function(){
	    		var _class = _view.data("animate")=="up" ? "dialogView-m-anim-down" : "dialogView-m-anim-close";
	    		_view.find(".dialogView-m-main").addClass(_class);
                _view.stop().unbind("click");
                _view.fadeOut(function(){
                	_view.remove();
                })
	    	},_showTime)
	    }
	}
    DialogViewPro.prototype.init.prototype = DialogViewPro.prototype;
	"function" == typeof define ? define(function(){
	    return dialogView;
	}) : "undefined" != typeof exports ? module.exports = dialogView : win.dialogView = dialogView;
})(window,document)