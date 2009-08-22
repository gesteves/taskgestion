$(document).ready(function() {
   initjQuery();	
});


function initjQuery() {
	if ((location.hash != "") && $(location.hash)) {
		switchContent($(location.hash)); 	
	}
	$("#main-nav a").click(getContent);
	
}


function getContent(event) {
	event.preventDefault();
    switchContent($($(this).attr('href')));
	return false;
}

function switchContent(section) {
	$.scrollTo(section, {duration: 500, onAfter:function() {changeHash(section.attr('id'));}});
}


function changeHash(hash) {
	location.hash = hash;
	return false;
}
