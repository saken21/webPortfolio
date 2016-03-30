package view;

import js.JQuery;

class Header {
	
	private static var _jParent:JQuery;
	
	/* =======================================================================
	Public - Init
	========================================================================== */
	public static function init():Void {
		
		_jParent = new JQuery('#header').on('click',onClick);
		
	}
	
		/* =======================================================================
		Public - Get Height
		========================================================================== */
		public static function getHeight():Int {

			return _jParent.outerHeight();

		}
	
	/* =======================================================================
	On Click
	========================================================================== */
	private static function onClick(event:JqEvent):Void {
		
		var jTarget:JQuery = new JQuery(event.target);
		
		if (jTarget.hasClass('title')) {
			Searchbox.reset();
		}
		
	}

}