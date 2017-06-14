package view;

import js.JQuery;
import jp.saken.utils.Handy;
import utils.Data;

class Searchbox {
	
	private static var _jParent :JQuery;
	private static var _jKeyword:JQuery;
	private static var _jFrom   :JQuery;
	private static var _jTo     :JQuery;
	private static var _jSubmit :JQuery;
	
	/* =======================================================================
	Public - Init
	========================================================================== */
	public static function init():Void {
		
		_jParent  = new JQuery('#searchbox');
		_jKeyword = _jParent.find('.keyword').find('input');
		_jFrom    = _jParent.find('.from').find('input');
		_jTo      = _jParent.find('.to').find('input');
		_jSubmit  = _jParent.find('.submit').find('button');
		
		_jSubmit.on('click',submit);
		reset();
		
	}
	
		/* =======================================================================
		Public - Reload
		========================================================================== */
		public static function reload():Void {

			_jSubmit.trigger('click');

		}
		
		/* =======================================================================
		Public - Reset
		========================================================================== */
		public static function reset():Void {
			
			setDefaultDate(Date.now());
			searchKeyword('');

		}
		
		/* =======================================================================
		Public - Search Keyword
		========================================================================== */
		public static function searchKeyword(keyword:String):Void {
			
			_jKeyword.prop('value',keyword);
			reload();

		}
	
	/* =======================================================================
	Set Default Date
	========================================================================== */
	private static function setDefaultDate(date:Date):Void {
		
		_jFrom.prop('value',getFormattedDate(2012,7));
		_jTo.prop('value',getFormattedDate(date.getFullYear(),date.getMonth() + 1));
		
	}
	
	/* =======================================================================
	Submit
	========================================================================== */
	private static function submit(event:JqEvent):Void {
		
		Works.removeHTML();
		
		var keyword:String = _jKeyword.prop('value');
		var from   :String = getDateNumber(_jFrom.prop('value'));
		var to     :String = getDateNumber(_jTo.prop('value'));
		
		Data.load(keyword,from,to);
		
		return untyped false;
		
	}
	
	/* =======================================================================
	Get Date Number
	========================================================================== */
	private static function getDateNumber(date:String):String {
		
		return StringTools.replace(date,'-','');
		
	}
	
	/* =======================================================================
	Get Formatted Date
	========================================================================== */
	private static function getFormattedDate(year:Int,month:Int):String {
		
		return year + '-' + Handy.getFilledNumber(month,2);
		
	}

}