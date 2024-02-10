from rest_framework.serializers import ModelSerializer
from .models import Category, Products


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(ModelSerializer):
    category_name = CategorySerializer(read_only=True, source="category")

    class Meta:
        model = Products
        fields = ("category", "sku", "name", "description",
                  "tags", "stocks", "availableStock", 'category_name')
        extra_kwargs = {'category': {'write_only': True}}
