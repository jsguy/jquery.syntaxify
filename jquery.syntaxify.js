//  Applies syntax highlighting from contents of an element
//  Requires: http://prismjs.com/
(function($){

	//  Ref: http://stackoverflow.com/questions/332872/how-to-encode-a-url-in-javascript
 	var	escapeHtml = function(text) {
		return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	};

	$.fn.syntaxify = function(selector, args){
		var $this = $(this),
			options = {
				language: 'markup'
			};
		args = args || {};
		$.extend(options, args);

		$this.each(function(idx,el){
			var $el = $(el);
			$el.html(
				'<pre class="syntaxifyCode">'+
					'<code class="language-'+options.language+'">'+
						$.trim(escapeHtml($(selector).html()))+
					'</code>'+
				'</pre>');
		});
	};

	//	On DOM ready we initialise inline syntax
	$(function(){
		$('[data-syntaxify]').each(function(idx,el){
			var $el = $(el),
				target = $el.data('syntaxify'),
				options = {
					language: $el.data('syntaxify-language') || 'markup'
				};
			$el.syntaxify(target, options);
		});
		$('[data-syntaxify-src]').each(function(idx,el){
			var $el = $(el),
				url = $el.data('syntaxify-src'),
				options = {
					language: $el.data('syntaxify-language') || 'markup'
				};
			(function(url, $el, options){
				$.get(url, function(data){
					//console.log(data);
					$('#test').html(escapeHtml(data));
					$el.syntaxify($('#test'), options);
				});
			}(url, $el, options));
		});
	});

}(window.jQuery || window.$))
