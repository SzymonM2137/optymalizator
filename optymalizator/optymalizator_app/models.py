from django.db import models

class LekRefundowany(models.Model):
    lp = models.IntegerField(default=0, null=False)
    substancja_czynna = models.TextField(default="", null=False)
    nazwa = models.TextField(default="", null=False)
    postac = models.TextField(default="", null=False)
    dawka = models.TextField(default="", null=False)    
    zawartosc_opakowania = models.TextField(default="", null=False)
    ean = models.TextField(default="", null=False, unique=True)

class DaneLeku(models.Model):
    ean = models.TextField(default="", null=False)
    grupa_limitowana = models.TextField(default="", null=False)
    cena_hurtowa = models.IntegerField(default=0, null=False)
    cena_detaliczna = models.IntegerField(default=0, null=False)
    wysokosc_limitu = models.IntegerField(default=0, null=False)
    zakres_wskazan = models.TextField(default="", null=False)
    zakres_wskazan_pozarejestracyjnych = models.TextField(default="", null=False)
    poziom_odplatnosci = models.CharField(max_length=32, default="", null=False)   
    wysokosc_doplaty = models.IntegerField(default = 0, null=False) 
    data_rozporzadzenia = models.DateField(null=False)

    def cena(self):
        result = str(self.wysokosc_doplaty)
        return f"{result[:-2]},{result[-2:]} zł"

class LicznikWyszukan(models.Model):
    ean = models.TextField(unique=True, null=False)
    ctr = models.IntegerField(default=0)
