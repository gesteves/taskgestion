from django.shortcuts import render_to_response
from django import http
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context

def index(request):
	response = render_to_response('index.html')
	return response