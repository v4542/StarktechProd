# models.py
import os
import shutil
from django.db import models
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete, post_save
from django.utils.text import slugify
from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+?1?\d{9,10}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 10 digits allowed."
)

def product_image_path(instance, filename):
    return os.path.join('products', str(instance.name), 'main', filename)

def additional_image_path(instance, filename):
    return os.path.join('products', str(instance.product.name), 'additional', filename)

def feature_image_path(instance, filename):
    return os.path.join('products', str(instance.product.name), 'features', filename)

class Product(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('out_of_stock', 'Out of Stock'),
        ('coming_soon', 'Coming Soon'),
        ('discontinued', 'Discontinued')
    ]
    
    # SEO and URL fields
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    meta_title = models.CharField(max_length=60, blank=True, help_text="SEO Meta Title")
    meta_description = models.CharField(max_length=160, blank=True, help_text="SEO Meta Description")
   
    # Existing fields
    name = models.CharField(max_length=200, unique=True)
    main_image = models.ImageField(upload_to=product_image_path)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # New fields
    name_marathi = models.CharField(max_length=255, blank=True, null=True)
    model = models.CharField(max_length=255)
    model_marathi = models.CharField(max_length=255, blank=True, null=True)
    description_marathi = models.TextField(blank=True, null=True)
    yt_link = models.URLField(blank=True, null=True)
    yt_tagline = models.CharField(max_length=255, blank=True, null=True)
    yt_tagline_marathi = models.CharField(max_length=255, blank=True, null=True)
    booking_tagline = models.CharField(max_length=255, blank=True, null=True)
    booking_tagline_marathi = models.CharField(max_length=255, blank=True, null=True)
    warrenty = models.CharField(max_length=50)
    technical_details_model_name = models.CharField(max_length=255)
    technical_details_model_name_marathi = models.CharField(max_length=255, blank=True, null=True)
    technical_details_brand_name = models.CharField(max_length=255)
    technical_details_brand_name_marathi = models.CharField(max_length=255, blank=True, null=True)
    technical_details_application = models.TextField()
    technical_details_application_marathi = models.TextField(blank=True, null=True)
    technical_details = models.JSONField()
    technical_details_marathi = models.JSONField(blank=True, null=True)
    demo_tagline = models.CharField(max_length=255, blank=True, null=True)
    demo_tagline_marathi = models.CharField(max_length=255, blank=True, null=True)
    demo_yt_link = models.URLField(blank=True, null=True)
   
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    installation_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    stock_quantity = models.IntegerField(default=0)
    min_order_quantity = models.IntegerField(default=1)
    max_order_quantity = models.IntegerField(null=True, blank=True)


    def save(self, *args, **kwargs):
    # Handle name change and folder renaming
        if self.pk:
            old_instance = Product.objects.get(pk=self.pk)
            old_name = old_instance.name
            if old_name != self.name:
                old_path = os.path.join('media', 'products', str(old_name))
                new_path = os.path.join('media', 'products', str(self.name))
                if os.path.exists(old_path):
                    os.rename(old_path, new_path)
        
        # Handle slug and discount percentage
        if not self.slug:
            self.slug = slugify(self.name)
        if self.discounted_price and self.price:
            self.discount_percentage = ((self.price - self.discounted_price) / self.price) * 100
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class AdditionalImage(models.Model):
    product = models.ForeignKey(Product, related_name='additional_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=additional_image_path)
    # New fields
    caption = models.CharField(max_length=255, blank=True, null=True)
    caption_marathi = models.CharField(max_length=255, blank=True, null=True)


class FeatureImage(models.Model):
    product = models.ForeignKey(Product, related_name='feature_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=feature_image_path)
    # New fields
    caption = models.CharField(max_length=255, blank=True, null=True)
    caption_marathi = models.CharField(max_length=255, blank=True, null=True)

    

@receiver(post_delete, sender=Product)
def delete_product_folder(sender, instance, **kwargs):
    folder_path = os.path.join('media', 'products', str(instance.name))
    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)

# New models
class Booking(models.Model):    
    # Basic information
    booking_number = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15, validators=[phone_validator])
    alternate_phone = models.CharField(max_length=15,validators=[phone_validator], blank=True)
    
    # Address information
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    
    # Booking details
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='bookings')
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    installation_required = models.BooleanField(default=False)
    installation_address = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Booking {self.booking_number} by {self.name}"

    def save(self, *args, **kwargs):
        if not self.booking_number:
            # Generate a unique booking number
            prefix = "BK"
            last_booking = Booking.objects.order_by('-id').first()
            if last_booking:
                last_number = int(last_booking.booking_number[2:])
                new_number = last_number + 1
            else:
                new_number = 1
            self.booking_number = f"{prefix}{new_number:06d}"
        
        # Calculate total amount
        self.total_amount = self.quantity * self.unit_price + self.tax_amount
        super().save(*args, **kwargs)

class JobOpening(models.Model):
    title = models.CharField(max_length=255)
    title_marathi = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    description_marathi = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='jobs/')

    def __str__(self):
        return self.title

@receiver(post_delete, sender=JobOpening)
def delete_job_opening_image(sender, instance, **kwargs):
    # Delete only the specific image file, not the entire folder
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

class Contact(models.Model):
    
    name = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=15, validators=[phone_validator])
    email = models.EmailField()
    inquiry_type = models.CharField(max_length=50)
    subject = models.CharField(max_length=255)
    message = models.TextField()
   
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contact from {self.name} - {self.inquiry_type}"
 

class JobApplication(models.Model):

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    gender=models.CharField(max_length=10, blank=True, null=True)
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True)
    linkedin_url = models.URLField(blank=True)
    position = models.CharField(max_length=100)
    skills = models.TextField()
    education_level = models.CharField(max_length=20)
    years_experience = models.PositiveIntegerField()
    portfolio_links = models.TextField(blank=True)
    additional_info = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.position}"
