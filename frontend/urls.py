from django.urls import path
from .views import ProductListView, ProductDetailView, BookingCreateView, JobOpeningListView, JobApplicationView, ContactView, OurServiceBookingListCreateView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('bookings/', BookingCreateView.as_view()),
    path('job-openings/', JobOpeningListView.as_view(), name='job-openings-list'),
    path('job-applications/', JobApplicationView.as_view(), name='job-applications'),
    path('contacts/', ContactView.as_view(), name='contact-create'),
    path('ourservicebookings/', OurServiceBookingListCreateView.as_view(), name='booking-list-create'),
]