;!(function(win,doc){
	var _dialogView = dialogView;
	var dialogView = {
		"open": function(){
			dialogViewPro();
			return this;
		},
		"alert": function(options){
			dialogViewPro(options);
			return this;
		}
	};
	var dialogViewPro = function(config){
		new dialogViewPro.prototype.init(config);
	}
	dialogViewPro.prototype = {
	    init: function(config) {
	        var _this_ = this;
			var _config = null;
			this.isConfig = false;
			this.config = {
	            auto: null,                              //宽高
	            type: null,                              //类型
	            buttons: null,                           //按钮
	            message: null,                           //文字
	            showTime: null,                          //显示时间
	            shade: true,                             //是否需要遮罩层
	            defaultMsg: "欢迎使用",                  //默认文字
	            defaultTime: 3000                        //默认显示时间
			};
			this.domCreat = {
            	"shade":   $("<div class='dialogView-m-shade'></div>"),
            	"main":    $("<div class='dialogView-m-main'></div>"),
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
            var _domCreat = this.domCreat;
            if(!this.isConfig){
            	_config.shade &&  _body.append(_domCreat.shade);
            	_body.append(_domCreat.main.append(_domCreat.section.append(_domCreat.wrap.append(_domCreat.content.html(_config.defaultMsg)))));
            	this.close(_config.defaultTime,_domCreat.main,_domCreat.shade);
            }else{
            	_config.shade &&  _body.append(_domCreat.shade);
            	_body.append(_domCreat.main.append(_domCreat.section.append(_domCreat.wrap.append(_domCreat.content.html(_config.message),_domCreat.buttons))));
            	_config.buttons.forEach(function(v,i){
            		_domCreat.buttons.append("<div data-btn='btn"+(i+1)+"'>"+v.text+"</div>");
            	})
            }
	    },
	    close: function(showTime,main,shade){
	    	setTimeout(function(){
                main.stop().unbind("click");
                main.remove();
                shade && shade.remove();
	    	},showTime)
	    }
	}
    dialogViewPro.prototype.init.prototype = dialogViewPro.prototype;
	win.dialogView = dialogView;
})(window,document)