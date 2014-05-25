//  Applies syntax highlighting from contents of an element
//  Requires: http://prismjs.com/
$.fn.syntaxify = function(selector, args){
	var $this = $(this),
		//  Ref: http://stackoverflow.com/questions/332872/how-to-encode-a-url-in-javascript
		escapeHtml = function(text) {
		  return text
			  .replace(/&/g, "&amp;")
			  .replace(/</g, "&lt;")
			  .replace(/>/g, "&gt;")
			  .replace(/"/g, "&quot;")
			  .replace(/'/g, "&#039;");
		},
		options = {
			language: 'html'
		};
	args = args || {};
	$.extend(options, args);

	$this.each(function(idx,el){
		var $el = $(el);
		$el.html('<pre class="syntaxifyCode"><code class="language-'+options.language+'">'+$.trim(escapeHtml($(selector).html()))+'</code></pre>');
	});
};

$(function(){
	$('#codeOut').syntaxify('#buttonLinkExample', { language: "markup" });

	$('[data-syntaxify]').each(function(idx,el){
		var $el = $(el),
			target = $el.data('syntaxify'),
			options = {
				language: $el.data('syntaxify-language') || 'html'
			};
		$el.syntaxify(target, options);
	});
});