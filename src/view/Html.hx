package view;

import js.JQuery;
import utils.Data;

class Html {
	
	/* =======================================================================
	Public - Get
	========================================================================== */
	public static function get(data:DataArray):String {
		
		var html:String = '<ul>';
		
		for (i in 0...data.length) {
			html += getWork(data[i]);
		}
		
		return html + '</ul>';

	}
	
	/* =======================================================================
	Get Work
	========================================================================== */
	private static function getWork(info:Dynamic):String {
		
		var html :String = '<li data-id="' + info.id + '">';
		var href :String = '';
		var image:String = '';
		
		if (info.url.length > 0) {
			href = ' href="' + info.url + '" class="link" target="_blank"';
		}
		
		if (info.image.length > 0) {
			
			var imageSRC:String = info.image;
			image = '<a href="' + imageSRC + '" class="lightbox"><img src="' + imageSRC + '"></a>';
			
		}
		
		html += '
		
			<p class="client">' + info.client + ' 様</p>
			<article>
				<p class="name">
					<a' + href + '>'   + info.name   + '</a>
				</p>
				<p class="image">' + image + '</p>
				<p class="note">' + info.note + '</p>
				<p class="tag">' + getTags(info.tag.split(',')) + '</p>
			</article>
		
		';
		
		return html + '</li>';

	}
	
	/* =======================================================================
	Get Tags
	========================================================================== */
	private static function getTags(tags:Array<String>):String {
		
		var html:String = '';
		
		for (i in 0...tags.length) {
			
			var tag:String = tags[i];
			if (tag.length == 0) continue;
			
			html += '<span class="tag-anchor">' + tag + '</span>';
		
		}
		
		return html;

	}

}