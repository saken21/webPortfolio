package utils;

import jp.saken.utils.API;
import view.Works;

typedef ParamMap  = Map<String,String>;
typedef DataArray = Array<Dynamic>;

class Data {
	
	private static inline var API_NAME:String = 'webResults2';
	
	/* =======================================================================
	Public - Load
	========================================================================== */
	public static function load(keyword:String,from:String,to:String):Void {
		
		var params:ParamMap = ['from'=>from,'to'=>to,'public'=>'true'];
		
		if (keyword.length > 0) {
			params['client'] = keyword;
		}
		
		API.getJSON(API_NAME,params,function(data:DataArray):Void {
			
			if (data.length == 0) {
				
				params.remove('client');
				params['keyword'] = keyword;
				
				API.getJSON(API_NAME,params,onLoaded);
				
				return;
				
			}
			
			onLoaded(data);
		
		});
		
	}
	
		/* =======================================================================
		Public - Load Image
		========================================================================== */
		public static function loadImage(id:Int,onLoaded:String->Void):Void {

			var params:ParamMap = ['id'=>Std.string(id),'image'=>'true'];

			API.getJSON(API_NAME,params,function(data:DataArray):Void {
				onLoaded(data[0].image);
			});

		}
	
	/* =======================================================================
	On Loaded
	========================================================================== */
	private static function onLoaded(data:DataArray):Void {
		
		data.reverse();
		
		if (data.length > 0) Works.setHTML(data);
		else Works.setEmptyHTML();
		
	}

}