/**
* ================================================================================
*
* WebPortfolio ver 1.00.00
*
* Author : KENTA SAKATA
* Since  : 2016/03/05
* Update : 2016/03/22
*
* Licensed under the MIT License
* Copyright (c) Kenta Sakata
* http://saken.jp/
*
* ================================================================================
*
**/
package;

import js.JQuery;
import view.Header;
import view.Searchbox;
import view.Works;
import utils.Data;

class Main {
	
	public static function main():Void {
		
		new JQuery('document').ready(function(event:JqEvent):Void {
			
			Header.init();
			Searchbox.init();
			
			Works.init();
			
		});
		
	}

}