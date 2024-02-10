from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Products(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sku = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tags = models.TextField()
    stocks = models.IntegerField()
    availableStock = models.IntegerField()
