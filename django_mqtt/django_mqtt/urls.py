"""
URL configuration for django_mqtt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from mqtt_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.base, name='base'),
    path('home/', views.home, name='home'),
    path('gerenciar/', views.gerenciar, name='gerenciar'),
    path('temporizador/', views.temporizador, name='temporizador'),
    path('historico/', views.historico, name='historico'),
    
    path('publish_ligar/', views.publish_message_ligar, name='publish_ligar'),
    path('publish_desligar/', views.publish_message_desligar, name='publish_desligar'),
    path('publish_10s/', views.publish_message_10s, name='publish_10s'),
    path('publish_30s/', views.publish_message_30s, name='publish_30s'),
    path('publish_1m/', views.publish_message_1m, name='publish_1m'),
    path('codigo/', views.codigo, name='codigo'),
]
