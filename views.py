# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django import http
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from google.appengine.api import mail
from google.appengine.api import memcache

def index(request):
	response = memcache.get("index")
	if response is None:
		response = render_to_response('index.html')
		memcache.add("index", response, 3600)
	return response

def flush_cache(request):
	flush = memcache.flush_all()
	if flush:
		return HttpResponse("Cache has been flushed", mimetype="text/plain")
	else:
		return HttpResponse("Cache has not been flushed", mimetype="text/plain")	
	
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
			message.to = "westeves@taskgestion.com, lhernandez@taskgestion.com"
			message.reply_to = email
			message.subject = "%s, desde el formulario de contacto de Task" % (name)
			message.body="""
Nombre y Apellido: %s
Email: %s
Teléfono: %s

%s			
""" % (name, email, phone, body)
			message.send()
			return http.HttpResponse("OK")
	else:
		return http.HttpResponse('400')