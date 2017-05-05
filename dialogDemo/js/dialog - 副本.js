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
		"type": ["alert","confirm","waiting","warning","msg"],
		"open": function(){
			DialogViewPro();
			return this;
		},
		"alert": function(options){
			DialogViewPro(options);
			return this;
		},
		"confirm": function(options){
			DialogViewPro(options);
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
			var _config = null;
			this.domCreat = null;
			this.isConfig = false;
			this.config = {
	            area: null,                              //宽高
	            type: null,                              //类型
	            buttons: null,                           //按钮
	            message: null,                           //文字
	            showTime: null,                          //显示时间
	            shade: true,                             //是否需要遮罩层
	            zIndex: 9999999,                         //默认z-index值
	            defaultText: "按钮",                     //默认按钮文字
	            defaultMsg: "欢迎使用",                  //默认文字
	            defaultTime: 3000                        //默认显示时间
			};
			this.domCreat = {
            	"shade":   $("<div class='dialogView-m-shade'></div>"),
            	"main":    $("<div class='dialogView-m-main mobile-dialogView'></div>"),
            	"section": $("<div class='dialogView-m-section'></div>"),
            	"wrap":    $("<div class='dialogView-m-wrap'></div>"),
            	"content": $("<div class='dialogView-m-content'></div>"),
            	"buttons": $("<div class='dialogView-m-buttons'></div>")
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
            /*var domCache = {
            	"shade":   $(".dialogView-shade"),
            	"main":    $(".dialogView-main"),
            	"section": $(".dialogView-section"),
            	"wrap":    $(".dialogView-wrap"),
            	"content": $(".dialogView-content"),
            	"buttons": $(".dialogView-buttons")
            };*/
            var _config = this.config;
            //var _domCreat = this.domCreat;
            var _domCreat = {};
            ++dialogView.index;
            _config.zIndex += dialogView.index;
            _config.shade && (_domCreat.shade = '<div class="dialogView-m-shade" style="z-index:'+_config.zIndex+'"></div>');
            if(!this.isConfig){
            	_domCreat.content = '<div class="dialogView-m-main mobile-dialogView" style="z-index:'+(_config.zIndex+1)+'"><div class="dialogView-m-section">' +
	                                '<div class="dialogView-m-wrap"><div class="dialogView-m-content">'+(_config.defaultMsg?_config.defaultMsg:"")+'</div></div></div></div>';
            }else{
	            _domCreat.content = '<div class="dialogView-m-main mobile-dialogView '+(_config.className?_config.className:"")+' style="z-index:'+(_config.zIndex+1)+'"><div class="dialogView-m-section">' +
	                                '<div class="dialogView-m-wrap"><div class="dialogView-m-content">'+(_config.message?_config.message:"")+'</div>' +
	                                '<div class="dialogView-m-buttons"></div></div></div></div>';
            }
            _body.append(_domCreat.shade,_domCreat.content);
            /*if(!this.isConfig){
            	_config.shade &&  _body.append(_domCreat.shade);
            	_body.append(_domCreat.main.append(_domCreat.section.append(_domCreat.wrap.append(_domCreat.content.html(_config.defaultMsg)))));
            	this.close(_domCreat.main,_domCreat.shade,_config.defaultTime);
            }else{
            	_config.shade &&  _body.append(_domCreat.shade);
            	_body.append(_domCreat.main.append(_domCreat.section.append(_domCreat.wrap.append(_domCreat.content.html(_config.message),_domCreat.buttons))));
            	_config.className && _domCreat.main.addClass(_config.className);
            	if(_config.area && commonsPart.isArray(_config.area)){
            		_config.area[0] && _domCreat.wrap.css("width",_config.area[0]);
            		_config.area[1] && _domCreat.wrap.css("height",_config.area[1]);
            	}
            	this.bindUI(_config,_domCreat);
            }
            _config.showTime && (_domCreat.wrap.attr("showTime",_config.showTime),this.close(_domCreat.main,_domCreat.shade,_config.showTime));
            _config.shade && _domCreat.shade && _domCreat.shade.css("z-index",_config.zIndex);
            _domCreat.main && _domCreat.main.css("z-index",(_config.zIndex+1));*/
	    },
	    bindUI: function(_config,_domCreat){ 
	    	if(commonsPart.isArray(_config.buttons)){
		    	_config.buttons.forEach(function(v,i){
	        		var _states = v.states ? v.states : "";
	        		var _text = v.text ? v.text : _config.defaultText;
                    var buttonWrap = $("<span data-btn='button' data-state='"+_states+"' class='"+_states+"'>"+_text+"</span>");
	        		_domCreat.buttons.append(buttonWrap);
	        		if(commonsPart.isFunction(v.callback)){
	        			buttonWrap.click(function(){
	        				v.callback();
	        			})
	        		}
	        	})
	        }
        	_domCreat.wrap.find("[data-state]").click(function(){
        		this.close(_domCreat.main,_domCreat.shade);
        	}.bind(this))
	    },
	    close: function(main,shade,showTime){
	    	var _main = main ? main : $(".dialogView-m-main");
	    	var _shade = shade ? shade : $(".dialogView-m-shade");
	    	var _showTime = showTime || 0;
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