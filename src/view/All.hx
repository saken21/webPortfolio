package view;

import js.JQuery;

class All {
	
	private static var _jParent:JQuery;
	
	/* =======================================================================
	Public - Init
	========================================================================== */
	public static function init():Void {
		
		_jParent = new JQuery('#all');
		
	}
	
		/* =======================================================================
		Public - Show Loading
		========================================================================== */
		public static function showLoading():Void {
			
			_jParent.removeClass('loaded');

		}
		
		/* =======================================================================
		Public - Hide Loading
		========================================================================== */
		public static function hideLoading():Void {
			
			_jParent.addClass('loaded');

		}

}