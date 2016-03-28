(function () { "use strict";
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	new js.JQuery("document").ready(function(event) {
		view.Searchbox.init();
		view.Works.init();
	});
};
var IMap = function() { };
IMap.__name__ = true;
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe.Http.__name__ = true;
haxe.Http.prototype = {
	setParameter: function(param,value) {
		this.params = Lambda.filter(this.params,function(p) {
			return p.param != param;
		});
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
};
var jp = {};
jp.saken = {};
jp.saken.ui = {};
jp.saken.ui.Lightbox = function() { };
jp.saken.ui.Lightbox.__name__ = true;
jp.saken.ui.Lightbox.init = function(cls,jField) {
	jp.saken.ui.Lightbox.setHTML();
	jp.saken.ui.Lightbox._jParent = new js.JQuery("#" + "lightbox");
	jp.saken.ui.Lightbox._jBackground = jp.saken.ui.Lightbox._jParent.find(".bg").css({ opacity : .8});
	jp.saken.ui.Lightbox._jContent = jp.saken.ui.Lightbox._jParent.find(".content");
	jp.saken.ui.Lightbox._class = cls;
	if(jField == null) jField = jp.saken.utils.Dom.jBody;
	jp.saken.ui.Lightbox._jBackground.add(jp.saken.ui.Lightbox._jParent.find(".close")).on("click",jp.saken.ui.Lightbox.hide);
	jp.saken.utils.Dom.jWindow.on("resize",jp.saken.ui.Lightbox.resize);
	jField.on("click",jp.saken.ui.Lightbox.onClick);
};
jp.saken.ui.Lightbox.setHTML = function() {
	var html = "\n\t\t<section id=\"" + "lightbox" + "\">\n\t\t\t<div class=\"bg\" id=\"" + "lightbox" + "-bg\">&nbsp;</div>\n\t\t\t<section class=\"content\" id=\"" + "lightbox" + "-content\"></section>\n\t\t\t<button class=\"close\" id=\"" + "lightbox" + "-close\">×</button>\n\t\t</section>";
	jp.saken.utils.Dom.jBody.append(html);
};
jp.saken.ui.Lightbox.onClick = function(event) {
	var jTarget = new js.JQuery(event.target);
	var jAnchor = jTarget.parents(jp.saken.ui.Lightbox._class);
	if(jAnchor.length == 0) return;
	var href = jAnchor.prop("href");
	if(href.length > 0) {
		jp.saken.ui.Lightbox.show(href);
		return false;
	}
};
jp.saken.ui.Lightbox.show = function(src) {
	jp.saken.ui.Lightbox._jContent.empty().css({ width : "", height : ""}).html("<img src=\"" + src + "\">").find("img").on("load",jp.saken.ui.Lightbox.resize);
	jp.saken.ui.Lightbox._jParent.stop().fadeIn(300);
};
jp.saken.ui.Lightbox.hide = function(event) {
	jp.saken.ui.Lightbox._jParent.stop().fadeOut(300);
};
jp.saken.ui.Lightbox.resize = function(event) {
	var jTarget = jp.saken.ui.Lightbox._jContent.find("img");
	var jWindow = jp.saken.utils.Dom.jWindow;
	var winW = jWindow.width();
	var winH = jWindow.height();
	var w = jTarget.width();
	var h = jTarget.height();
	if(w > winW) w = winW;
	if(h > winH) h = winH;
	var x = Math.floor((winW - w) * .5);
	var y = Math.floor((winH - h) * .5);
	jp.saken.ui.Lightbox._jContent.css({ left : x, top : y, width : w, height : h});
};
jp.saken.utils = {};
jp.saken.utils.API = function() { };
jp.saken.utils.API.__name__ = true;
jp.saken.utils.API.getJSON = function(name,params,onLoaded) {
	jp.saken.utils.API.getString(name,params,function(data) {
		onLoaded(JSON.parse(data));
	});
};
jp.saken.utils.API.getString = function(name,params,onLoaded) {
	var http = new haxe.Http("/api/" + name + "/");
	http.onData = function(data) {
		onLoaded(data);
	};
	var $it0 = params.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		http.setParameter(key,params.get(key));
	}
	http.request(true);
};
jp.saken.utils.API.getIP = function(onLoaded) {
	jp.saken.utils.API.getString("handy",(function($this) {
		var $r;
		var _g = new haxe.ds.StringMap();
		_g.set("key","ip");
		$r = _g;
		return $r;
	}(this)),onLoaded);
};
var js = {};
jp.saken.utils.Dom = function() { };
jp.saken.utils.Dom.__name__ = true;
jp.saken.utils.Handy = function() { };
jp.saken.utils.Handy.__name__ = true;
jp.saken.utils.Handy.alert = function(value) {
	jp.saken.utils.Dom.window.alert(value);
};
jp.saken.utils.Handy.confirm = function(text,ok,cancel) {
	if(jp.saken.utils.Dom.window.confirm(text)) ok(); else if(cancel != null) cancel();
};
jp.saken.utils.Handy.getPastDate = function(date,num) {
	if(num == null) num = 30;
	var second = HxOverrides.strDate(date).getTime() - num * 86400000;
	var date1;
	var d = new Date();
	d.setTime(second);
	date1 = d;
	var m = jp.saken.utils.Handy.getFilledNumber(date1.getMonth() + 1,2);
	var d1 = jp.saken.utils.Handy.getFilledNumber(date1.getDate(),2);
	return date1.getFullYear() + "-" + m + "-" + d1;
};
jp.saken.utils.Handy.getFilledNumber = function(num,digits) {
	if(digits == null) digits = 3;
	var result = num + "";
	var blankLength = digits - jp.saken.utils.Handy.getDigits(num);
	var _g = 0;
	while(_g < blankLength) {
		var i = _g++;
		result = "0" + result;
	}
	return result;
};
jp.saken.utils.Handy.getDigits = function(val) {
	return (val + "").length;
};
jp.saken.utils.Handy.getFormattedPrice = function(price) {
	var string;
	if(price == null) string = "null"; else string = "" + price;
	var length = string.length;
	var result = "";
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		if(i > 0 && (length - i) % 3 == 0) result += ",";
		result += string.charAt(i);
	}
	return "￥" + result + "-";
};
jp.saken.utils.Handy.getLinkedHTML = function(text,target) {
	if(target == null) target = "_blank";
	if(new EReg("http","").match(text)) text = new EReg("((http|https)://[0-9a-z-/._?=&%\\[\\]~^:]+)","gi").replace(text,"<a href=\"$1\" target=\"" + target + "\">$1</a>");
	return text;
};
jp.saken.utils.Handy.getBreakedHTML = function(text) {
	if(new EReg("\n","").match(text)) text = new EReg("\r?\n","g").replace(text,"<br>");
	return text;
};
jp.saken.utils.Handy.getAdjustedHTML = function(text) {
	return jp.saken.utils.Handy.getLinkedHTML(jp.saken.utils.Handy.getBreakedHTML(text));
};
jp.saken.utils.Handy.getLines = function(text) {
	return jp.saken.utils.Handy.getNumberOfCharacter(text,"\n") + 1;
};
jp.saken.utils.Handy.getNumberOfCharacter = function(text,character) {
	return text.split(character).length - 1;
};
jp.saken.utils.Handy.getLimitText = function(text,count) {
	if(count == null) count = 10;
	if(text.length > count) text = HxOverrides.substr(text,0,count) + "...";
	return text;
};
jp.saken.utils.Handy.getReplacedSC = function(text) {
	text = StringTools.replace(text,"'","&#039;");
	text = StringTools.replace(text,"\\","&#47;");
	return text;
};
jp.saken.utils.Handy.getSlicedArray = function(array,num) {
	if(num == null) num = 1000;
	var results = [];
	var _g1 = 0;
	var _g = Math.ceil(array.length / num);
	while(_g1 < _g) {
		var i = _g1++;
		var j = i * num;
		results.push(array.slice(j,j + num));
	}
	return results;
};
jp.saken.utils.Handy.shuffleArray = function(array) {
	var copy = array.slice();
	var results = [];
	var length = copy.length;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		var index = Math.floor(Math.random() * length);
		results.push(copy[index]);
		copy.splice(index,1);
	}
	return results;
};
jp.saken.utils.Handy.getMap = function(array) {
	var map = new haxe.ds.IntMap();
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		var info = array[i];
		var id = info.id;
		Reflect.deleteField(info,"id");
		var fields = Reflect.fields(info);
		var value;
		if(fields.length > 1) value = info; else value = Reflect.getProperty(info,fields[0]);
		var v = value;
		map.set(id,v);
		v;
	}
	return map;
};
jp.saken.utils.Handy.getIsImageSource = function(string) {
	return new EReg("data:image","").match(string);
};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Browser = function() { };
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
var utils = {};
utils.Data = function() { };
utils.Data.__name__ = true;
utils.Data.load = function(keyword,from,to) {
	var params;
	var _g = new haxe.ds.StringMap();
	_g.set("from",from);
	_g.set("to",to);
	_g.set("public","true");
	params = _g;
	if(keyword.length > 0) {
		params.set("client",keyword);
		keyword;
	}
	jp.saken.utils.API.getJSON("webResults2",params,function(data) {
		if(data.length == 0) {
			params.remove("client");
			params.set("keyword",keyword);
			keyword;
			jp.saken.utils.API.getJSON("webResults2",params,utils.Data.onLoaded);
			return;
		}
		utils.Data.onLoaded(data);
	});
};
utils.Data.onLoaded = function(data) {
	if(data.length > 0) view.Works.setHTML(data); else view.Works.setEmptyHTML();
};
var view = {};
view.Html = function() { };
view.Html.__name__ = true;
view.Html.get = function(data) {
	console.log(data);
	var html = "<ul>";
	var _g1 = 0;
	var _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		html += view.Html.getWork(data[i]);
	}
	return html + "</ul>";
};
view.Html.getWork = function(info) {
	var html = "<li data-id=\"" + Std.string(info.id) + "\">";
	var href = "";
	var image = "";
	if(info.url.length > 0) href = " href=\"" + Std.string(info.url) + "\" class=\"link\" target=\"_blank\"";
	if(info.image.length > 0) image = "<a href=\"" + Std.string(info.image) + "\" class=\"lightbox\"><img src=\"" + Std.string(info.image) + "\"></a>";
	html += "\n\t\t\n\t\t\t<p class=\"client\">" + Std.string(info.client) + " 様</p>\n\t\t\t<article>\n\t\t\t\t<p class=\"name\">\n\t\t\t\t\t<a" + href + ">" + Std.string(info.name) + "</a>\n\t\t\t\t</p>\n\t\t\t\t<p class=\"image\">" + image + "</p>\n\t\t\t\t<p class=\"note\">" + Std.string(info.note) + "</p>\n\t\t\t\t<p class=\"tag\">" + view.Html.getTags(info.tag.split(",")) + "</p>\n\t\t\t</article>\n\t\t\n\t\t";
	return html + "</li>";
};
view.Html.getTags = function(tags) {
	var html = "";
	var _g1 = 0;
	var _g = tags.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tag = tags[i];
		if(tag.length == 0) continue;
		html += "<span>" + tag + "</span>";
	}
	return html;
};
view.Searchbox = function() { };
view.Searchbox.__name__ = true;
view.Searchbox.init = function() {
	view.Searchbox._jParent = new js.JQuery("#searchbox");
	view.Searchbox._jKeyword = view.Searchbox._jParent.find(".keyword").find("input");
	view.Searchbox._jFrom = view.Searchbox._jParent.find(".from").find("input");
	view.Searchbox._jTo = view.Searchbox._jParent.find(".to").find("input");
	view.Searchbox._jSubmit = view.Searchbox._jParent.find(".submit").find("button");
	view.Searchbox.setYear(new Date().getFullYear());
	view.Searchbox._jSubmit.on("click",view.Searchbox.submit).trigger("click");
};
view.Searchbox.reload = function() {
	view.Searchbox._jSubmit.trigger("click");
};
view.Searchbox.setYear = function(year) {
	view.Searchbox._jFrom.prop("value",view.Searchbox.getFormattedDate(2012,7));
	view.Searchbox._jTo.prop("value",view.Searchbox.getFormattedDate(year,12));
};
view.Searchbox.submit = function(event) {
	var keyword = view.Searchbox._jKeyword.prop("value");
	var from = view.Searchbox.getDateNumber(view.Searchbox._jFrom.prop("value"));
	var to = view.Searchbox.getDateNumber(view.Searchbox._jTo.prop("value"));
	utils.Data.load(keyword,from,to);
	return false;
};
view.Searchbox.getDateNumber = function(date) {
	return StringTools.replace(date,"-","");
};
view.Searchbox.getFormattedDate = function(year,month) {
	return year + "-" + jp.saken.utils.Handy.getFilledNumber(month,2);
};
view.Works = function() { };
view.Works.__name__ = true;
view.Works.init = function() {
	view.Works._jParent = new js.JQuery("#works");
	jp.saken.ui.Lightbox.init(".lightbox");
};
view.Works.setHTML = function(data) {
	view.Works._jParent.html(view.Html.get(data));
};
view.Works.setEmptyHTML = function() {
	view.Works._jParent.html("検索結果：0件");
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
var q = window.jQuery;
js.JQuery = q;
jp.saken.ui.Lightbox.ID = "lightbox";
jp.saken.utils.API.PATH = "/api/";
jp.saken.utils.Dom.document = window.document;
jp.saken.utils.Dom.window = window;
jp.saken.utils.Dom.jWindow = new js.JQuery(jp.saken.utils.Dom.window);
jp.saken.utils.Dom.body = jp.saken.utils.Dom.document.body;
jp.saken.utils.Dom.jBody = new js.JQuery(jp.saken.utils.Dom.body);
jp.saken.utils.Dom.userAgent = jp.saken.utils.Dom.window.navigator.userAgent;
utils.Data.API_NAME = "webResults2";
Main.main();
})();
