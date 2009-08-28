$(document).ready(function() {
   initjQuery();	
});


function initjQuery() {
	if ((location.hash != "") && $(location.hash)) {
		$('#main-nav a').removeClass('selected');
		$('#main-nav a[href="'+location.hash+'"]').addClass('selected'); 	
	}
	$("#main-nav a").click(getContent);
	$('#send').click(sendEmail);	
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

function sendEmail(event) {
	event.preventDefault();
	$('#send').text("Enviando…");
	var bademail = "Por favor, escriba una dirección de email válida.";
	var badname = "Por favor, escriba su nombre.";
	var badmessage = "Por favor, escriba su mensaje.";
	var sent = "¡Mensaje enviado!";
	var send = "Enviar mensaje";
	var name = $(':text[name=name]').val();
	var email = $(':text[name=email]').val();
	var phone = $(':text[name=phone]').val();
	var message = $(':input[name=message]').val();
	$.post("/contact/", {name: name, email: email, phone: phone, message: message}, function(data) {
		if (data == "Invalid email") {
			$('span.contact-error').html(bademail);
			$('#send').text(send);
		} else if (data == "Invalid name") {
			$('span.contact-error').html(badname);
			$('#send').text(send);
		} else if (data == "Invalid message") {
			$('span.contact-error').html(badmessage);
			$('#send').text(send);
		} else if (data == "OK") {
			$('#send').text(send);
			$('span.contact-error').html(sent);
		}
	});
}
