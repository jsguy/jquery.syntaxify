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
		},
		getOptions = function($el){
			var language = $el.data('syntaxify-language');
			return language? {language: language}: {};
		};

	$.fn.syntaxify = function(selector, args){
		var $this = $(this),
			$selectedEl = $(selector),
			options = {
				language: 'markup'
			};
		args = args || {};
		$.extend(options, getOptions($selectedEl), args);

		$this.each(function(idx,el){
			var $el = $(el),
				annotations,
				html = $.trim(escapeHtml($selectedEl.html()));

			if($el.data('annotations')) {
				annotations = $el.data('annotations')
			}

			$el.html(
				'<pre class="syntaxifyCode language-'+options.language+'" '+(annotations? 'data-annotations="' + annotations + '"': "")+'>'+
					'<code class="language-'+options.language+'">'+
						html+
					'</code>'+
				'</pre>'
			);
			Prism.highlightElement($el.find('pre.syntaxifyCode code').get(0));
		});
	};

	//	On DOM ready we initialise inline syntax
	$(function(){
		$('[data-syntaxify]').each(function(idx,el){
			var $el = $(el),
				target = $el.data('syntaxify');
			$el.syntaxify(target, getOptions($el));
		});
		$('[data-syntaxify-src]').each(function(idx,el){
			var $el = $(el),
				url = $el.data('syntaxify-src'),
				options = getOptions($el);
			(function(url, $el, options){
				$.get(url, function(data){
					$('#test').html(escapeHtml(data));
					$el.syntaxify($('#test'), options);
				});
			}(url, $el, options));
		});
	});

}(window.jQuery || window.$))