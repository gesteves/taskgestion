from django.shortcuts import render_to_response
from django import http
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from google.appengine.api import mail
from google.appengine.api import memcache

def index(request):
	response = render_to_response('index.html')
	return response
	
	
def not_found(request):
	t = get_template('index.html')
	html = t.render(Context())
	return http.HttpResponseNotFound(html)
	
	
def contact(request):
	if request.method == "POST":
		name = request.POST['name']
		email = request.POST['email']
		phone = request.POST['phone']
		body = request.POST['message']

		if name == "":
			return http.HttpResponse("Invalid name")
		elif mail.is_email_valid(email) is False:
			return http.HttpResponse("Invalid email")
		elif body == "":
			return http.HttpResponse("Invalid message")
		else:
			message = mail.EmailMessage()
			message.sender = "contacto@taskgestion.com"
			message.to = "g@gesteves.com"
			message.reply_to = email
			message.subject = "%s ha escrito en el formulario de contacto" % (name)
			message.body="""
Nombre y Apellido: %s
Correo Electr&oacute;nico: %s
Tel&eacute;fono: %s

%s			
""" % (name, email, phone, body)
			message.send()
			return http.HttpResponse("OK")
	else:
		return http.HttpResponse('400')