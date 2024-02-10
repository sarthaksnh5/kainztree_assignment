from . import views
from django.urls import path

urlpatterns = [
    path("products", views.ProductAPIView.as_view()),
    path("products/<str:pk>", views.ProductAPIView.as_view()),
    path("category", views.CatgoryAPIView.as_view()),
    path("category/<str:pk>", views.CatgoryAPIView.as_view()),    
]
