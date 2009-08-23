$(document).ready(function() {
   initjQuery();	
});


function initjQuery() {
	if ((location.hash != "") && $(location.hash)) {
		switchContent($(location.hash));
		$('#main-nav a').removeClass('selected');
		$('#main-nav a[href="'+location.hash+'"]').addClass('selected'); 	
	}
	$("#main-nav a").click(getContent);
	
}


function getContent(event) {
	event.preventDefault();
	$('#main-nav a').removeClass('selected');
	$(this).addClass('selected');
    switchContent($($(this).attr('href')));
	return false;
}

function switchContent(section) {
	$.scrollTo(section, {duration: 500, onAfter:function() {changeHash(section.attr('id'));}});
	pageTracker._trackEvent('Section', 'View', $("#main-nav a[href='#"+section.attr('id')+"']").text());
}


function changeHash(hash) {
	location.hash = hash;
	return false;
}
