;!(function(win,doc){
	var _dialogView = dialogView;
	var commonsPart = {
		isArray: function(data){
			return data && typeof data==='object' && Array == data.constructor;
		},
		isFunction: function(data){
			return data && typeof data =="function" && Function == data.constructor;
		}
	};
	var dialogView = {
		"version": "0.0.1",
		"author": "yqx_cn",
		"index": 0,
		"type": ["alert","confirm","msg","waiting","warning"],
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
		"close": function(options){
			DialogViewPro.prototype.close(options);
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
	            shade: true,                             //是否需要遮罩层
	            shadeClose: false,                       //点击遮罩层是否关闭弹窗
	            zIndex: 9999999,                         //默认z-index值
	            defaultText: "按钮",                     //默认按钮文字
	            defaultMsg: "欢迎使用",                  //默认文字
	            defaultTime: 3000                        //默认显示时间
			};
            if(config && config.constructor === Object && typeof config == "object"){
				this.isConfig = true;
			}
            this.config = $.extend({}, this.config, config);
	        this.creat();
	    },
	    creat: function(){
	    	var _this_ = this;
	    	var _body = $("body");
            var _config = this.config;
            var _domCreat = {},_bomCache = {};
            ++dialogView.index;
            _config.zIndex += dialogView.index;
            _config.shade && (_domCreat.shade = '<div class="dialogView-m-shade" times="'+dialogView.index+'" style="z-index:'+_config.zIndex+'"></div>');
            if(!this.isConfig){
            	_domCreat.content = '<div class="dialogView-m-main mobile-dialogView" times="'+dialogView.index+'" style="z-index:'+(_config.zIndex+1)+'"><div class="dialogView-m-section">' +
	                                '<div class="dialogView-m-wrap"><div class="dialogView-m-content">'+(_config.defaultMsg?_config.defaultMsg:"")+'</div></div></div></div>';
            }else{
	            _domCreat.content = '<div class="dialogView-m-main mobile-dialogView '+(_config.className?_config.className:"")+'" times="'+dialogView.index+'" style="z-index:'+(_config.zIndex+1)+'"><div class="dialogView-m-section">' +
	                                '<div class="dialogView-m-wrap '+(_config.type ? 'dialogView-m-'+_config.type : "")+'"> '+this.titleUI()+' <div class="dialogView-m-content">'+(_config.message?_config.message:"")+'</div>' +
	                                '<div class="dialogView-m-buttons"></div></div></div></div>';
            }
            _body.append(_domCreat.shade,_domCreat.content);
            _bomCache = {
            	"shade":   $(".dialogView-m-shade[times="+dialogView.index+"]"),
            	"main":    $(".dialogView-m-main[times="+dialogView.index+"]"),
            	"section": $(".dialogView-m-main[times="+dialogView.index+"] .dialogView-m-section"),
            	"wrap":    $(".dialogView-m-main[times="+dialogView.index+"] .dialogView-m-wrap"),
            	"content": $(".dialogView-m-main[times="+dialogView.index+"] .dialogView-m-content"),
            	"buttons": $(".dialogView-m-main[times="+dialogView.index+"] .dialogView-m-buttons")
            };
            this.isConfig 
            ? (_config.showTime && _bomCache.main.attr("showTime",_config.showTime))
            : (_config.defaultTime && _bomCache.main.attr("showTime",_config.defaultTime));
            this.buttonsUI(_config,_bomCache);
            this.bindUI(_config,_bomCache);
	    },
	    bindUI: function(_config,_bomCache){
	    	var _this_ = this;
	    	//设置了showTime值就自动关闭
	    	_bomCache.main.attr("showTime") && this.close(_bomCache.main.attr("times"));
            //点击遮罩层自动关闭
            _bomCache.shade.click(function(event) {
            	(_config.shade && _config.shadeClose) && _this_.close($(this).attr("times"));
            });
	    	
	    	_bomCache.wrap.find("[data-skin]").click(function(event){
        		this.close(_bomCache.main.attr("times"));
        	}.bind(this))
	    },
	    titleUI: function(){
	    	var _title = this.config.title;
	    	if(commonsPart.isArray(_title)){
	    		return '<div class="dialogView-m-title" style='+(_title[1] ? _title[1] : "")+'><h3>'+_title[0]+'</h3></div>';
	    	}else{return "";}
	    },
	    buttonsUI: function(_config,_bomCache){ 
	    	if(!commonsPart.isArray(_config.buttons)){
	    		_bomCache.buttons.remove();
	    		return false;
	    	}
	    	_config.buttons.forEach(function(v,i){
        		var _skin = v.skin ? v.skin : "";
        		var _text = v.text ? v.text : _config.defaultText;
                var buttonWrap = $("<span data-btn='button' data-skin='"+_skin+"' class='"+_skin+"'>"+_text+"</span>");
        		_bomCache.buttons.append(buttonWrap);
        		if(commonsPart.isFunction(v.callback)){
        			buttonWrap.click(function(){
        				v.callback();
        			})
        		}
        	})
	    },
	    close: function(times){
	    	var _times = times;
	    	var _main = _times ? $(".dialogView-m-main[times="+_times+"]") : $(".dialogView-m-main");
	    	var _shade = _times ? $(".dialogView-m-shade[times="+_times+"]") : $(".dialogView-m-shade");
	    	var _showTime = _times ? $(".dialogView-m-main[times="+_times+"]").attr("showTime") : 0;
	    	setTimeout(function(){
	    		_main.addClass('dialogView-m-anim-close');
                _main.stop().unbind("click");
                _shade && _shade.remove();
                _main.fadeOut(function(){
                	_main.remove();
                })
	    	},_showTime)
	    }
	}
    DialogViewPro.prototype.init.prototype = DialogViewPro.prototype;
	win.dialogView = dialogView;
})(window,document)