package view;

import js.JQuery;
import utils.Data;
import jp.saken.ui.Lightbox;
import jp.saken.utils.Handy;
import jp.saken.utils.Dom;

class Works {
	
	private static var _jParent:JQuery;
	
	/* =======================================================================
	Public - Init
	========================================================================== */
	public static function init():Void {
		
		_jParent = new JQuery('#works').on('click',onClick);
		
		Dom.jWindow.on('resize',onResize);
		Lightbox.init('.lightbox');
		
	}
	
		/* =======================================================================
		Public - Remove HTML
		========================================================================== */
		public static function removeHTML():Void {
			
			All.showLoading();
			_jParent.empty();

		}
	
		/* =======================================================================
		Public - Set HTML
		========================================================================== */
		public static function setHTML(data:DataArray):Void {
			
			_jParent.hide().html(Html.get(data)).delay(300).fadeIn(600,All.hideLoading);

		}
		
		/* =======================================================================
		Public - Set Empty HTML
		========================================================================== */
		public static function setEmptyHTML():Void {
			
			All.hideLoading();
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
	
	/* =======================================================================
	On Resize
	========================================================================== */
	private static function onResize(event:JqEvent):Void {
		
		_jParent.css({ paddingTop:Header.getHeight() + 20 });
		
	}

}