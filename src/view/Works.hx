package view;

import js.JQuery;
import utils.Data;
import jp.saken.utils.Handy;
import jp.saken.utils.Dom;

class Works {
	
	private static var _jParent:JQuery;
	
	/* =======================================================================
	Public - Init
	========================================================================== */
	public static function init():Void {
		
		_jParent = new JQuery('#works').on('click',onClick);
		Dom.jWindow.on('resize',onResize).trigger('resize');
		
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
			
			_jParent.hide().html(Html.get(data)).fadeIn(400,function():Void {
				
				All.hideLoading();
				var jList:JQuery = _jParent.find('li');
				
				_jParent.find('li').each(function():Void {
					setImage(JQuery.cur);
				});
				
			});

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
	
	/* =======================================================================
	Set Image
	========================================================================== */
	private static function setImage(jParent:JQuery):Void {
		
		var id:Int = jParent.data('id');
		
		Handy.timer(function():Void {
			
			Data.loadImage(id,function(imageSRC:String):Void {

				var jImage:JQuery = jParent.find('.image');

				if (imageSRC.length == 0) {

					jImage.addClass('empty');
					return;

				}

				jImage.find('img').prop('src',imageSRC).hide().fadeIn(600);

			});
			
		},50 * jParent.index());
		
	}

}