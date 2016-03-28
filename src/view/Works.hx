package view;

import js.JQuery;
import utils.Data;
import jp.saken.ui.Lightbox;

class Works {
	
	private static var _jParent:JQuery;
	
	/* =======================================================================
	Public - Init
	========================================================================== */
	public static function init():Void {
		
		_jParent = new JQuery('#works').on('click',onClick);
		Lightbox.init('.lightbox');
		
	}
	
		/* =======================================================================
		Public - Set HTML
		========================================================================== */
		public static function setHTML(data:DataArray):Void {
			
			_jParent.html(Html.get(data));

		}
		
		/* =======================================================================
		Public - Set Empty HTML
		========================================================================== */
		public static function setEmptyHTML():Void {
			
			_jParent.html('検索結果：0件');

		}
	
	/* =======================================================================
	On Click
	========================================================================== */
	private static function onClick(event:JqEvent):Void {
		
		var jTarget:JQuery = new JQuery(event.target);
		
		if (jTarget.hasClass('tag-anchor')) {
			Searchbox.searchKeyword(jTarget.text());
		}
		
	}

}