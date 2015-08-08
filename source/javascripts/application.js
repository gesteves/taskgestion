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
  var label = $("#main-nav a[href='#"+section.attr('id')+"']").text();
  _gaq.push(['_trackEvent','Section', 'View', label]);
}


function changeHash(hash) {
  location.hash = hash;
  return false;
}

function sendEmail(event) {
  event.preventDefault();
  $('#send').attr("value", "Enviando…");
  var bademail = "Por favor, escriba una dirección de email válida.";
  var badname = "Por favor, escriba su nombre.";
  var badmessage = "Por favor, escriba su mensaje.";
  var sent = "¡Mensaje enviado!";
  var send = "Enviar mensaje";
  $('#send').attr("disabled", "disabled");
  var name = $(':text[name=name]').val();
  var email = $(':text[name=email]').val();
  var phone = $(':text[name=phone]').val();
  var message = $(':input[name=message]').val();
  $.post("/contact/", {name: name, email: email, phone: phone, message: message}, function(data) {
    if (data == "Invalid email") {
      $('span.contact-error').html(bademail);
      $('#send').removeAttr("disabled");
      $('#send').attr("value", send);
    } else if (data == "Invalid name") {
      $('span.contact-error').html(badname);
      $('#send').removeAttr("disabled");
      $('#send').attr("value", send);
    } else if (data == "Invalid message") {
      $('span.contact-error').html(badmessage);
      $('#send').removeAttr("disabled");
      $('#send').attr("value", send);
    } else if (data == "OK") {
      $('#send').attr("value", sent);
      $('span.contact-error').empty();
    }
  });
}
