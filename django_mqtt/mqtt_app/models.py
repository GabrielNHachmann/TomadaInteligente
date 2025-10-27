from django.db import models

# Create your models here.
class Historico(models.Model):
    data = models.DateTimeField(auto_now_add=True)
    ligou = models.IntegerField(blank=True, null=True)
    desligou = models.IntegerField(blank=True, null=True)
    temporizador = models.DateTimeField(max_length=1000, blank=True, null=True)

    def _str_(self):
        return self.nome