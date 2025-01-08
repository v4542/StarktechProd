from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms import BaseInlineFormSet, ModelForm
from .models import (
    Product, AdditionalImage, FeatureImage,
    Booking, JobOpening, Contact, JobApplication
)
import os
 
# Product Admin Configuration
class ProductAdminForm(ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        discounted_price = cleaned_data.get('discounted_price')
        price = cleaned_data.get('price')
        
        if discounted_price and price and discounted_price >= price:
            raise ValidationError("Discounted price must be less than regular price")
        
        return cleaned_data

class AdditionalImageInline(admin.TabularInline):
    model = AdditionalImage
    min_num = 3
    max_num = 3
    extra = 3
    fields = ('image', 'caption', 'caption_marathi')
    
    def has_delete_permission(self, request, obj=None):
        return False

class FeatureImageInline(admin.TabularInline):
    model = FeatureImage
    min_num = 2
    max_num = 2
    extra = 2
    fields = ('image', 'caption', 'caption_marathi')
    
    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    
    list_display = (
        'name', 'model', 'price', 'discounted_price', 
        'status', 'stock_quantity', 'created_at', 'updated_at'
    )
    list_filter = ('status', 'created_at', 'updated_at')
    search_fields = ('name', 'model', 'name_marathi', 'model_marathi')
    readonly_fields = ('created_at', 'updated_at', 'slug', 'discount_percentage')
    
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'name', 'name_marathi', 'model', 'model_marathi',
                'description', 'description_marathi', 'main_image'
            )
        }),
        ('Pricing & Stock', {
            'fields': (
                'price', 'discounted_price', 'discount_percentage',
                'tax_rate', 'installation_cost', 'status', 
                'stock_quantity', 'min_order_quantity', 'max_order_quantity'
            )
        }),
        ('SEO Information', {
            'fields': ('slug', 'meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('YouTube & Demo', {
            'fields': (
                'yt_link', 'yt_tagline', 'yt_tagline_marathi',
                'demo_yt_link', 'demo_tagline', 'demo_tagline_marathi'
            ),
            'classes': ('collapse',)
        }),
        ('Booking Information', {
            'fields': ('booking_tagline', 'booking_tagline_marathi'),
            'classes': ('collapse',)
        }),
        ('Technical Details', {
            'fields': (
                'warrenty', 'technical_details_model_name', 
                'technical_details_model_name_marathi',
                'technical_details_brand_name', 'technical_details_brand_name_marathi',
                'technical_details_application', 'technical_details_application_marathi',
                'technical_details', 'technical_details_marathi'
            ),
            'classes': ('collapse',)
        }),
    )
    
    inlines = [AdditionalImageInline, FeatureImageInline]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        product_folder = os.path.join('media', 'products', str(obj.name))
        folders = ['main', 'additional', 'features']
        
        for folder in folders:
            folder_path = os.path.join(product_folder, folder)
            os.makedirs(folder_path, exist_ok=True)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        
        valid_forms = sum(1 for f in formset.forms if f.cleaned_data and not f.cleaned_data.get('DELETE', False))
        
        if formset.model == AdditionalImage and valid_forms != 3:
            raise ValidationError('Exactly 3 additional images are required.')
        elif formset.model == FeatureImage and valid_forms != 2:
            raise ValidationError('Exactly 2 feature images are required.')
            
        for instance in instances:
            instance.save()
            
        for obj in formset.deleted_objects:
            obj.delete()


class JobApplicationAdmin(admin.ModelAdmin):
    # Fields to be shown in the form
    fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'linkedin_url', 'position', 'skills', 'education_level', 'years_experience', 'portfolio_links', 'additional_info']
    
    # Fields to be displayed in the list view
    list_display = ['first_name', 'last_name', 'position', 'email', 'phone', 'years_experience', 'created_at']
    
    search_fields = ['first_name', 'last_name', 'email', 'position']
    list_filter = ['years_experience']

admin.site.register(JobApplication, JobApplicationAdmin)

# Booking Admin
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'booking_number', 'name', 'phone', 'product', 
        'quantity', 'unit_price', 'created_at'
    )
    list_filter = ('created_at', 'installation_required')
    search_fields = ('booking_number', 'name', 'phone', 'email')
    readonly_fields = ('booking_number', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Booking Information', {
            'fields': ('booking_number', 'product', 'quantity', 'unit_price', 'tax_amount')
        }),
        ('Customer Information', {
            'fields': ('name', 'email', 'phone', 'alternate_phone')
        }),
        ('Address Information', {
            'fields': ('address', 'city', 'state', 'pincode')
        }),
        ('Installation', {
            'fields': ('installation_required', 'installation_address'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

# Job Opening Admin
@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = ('title', 'title_marathi')
    search_fields = ('title', 'title_marathi', 'description')
    
    fieldsets = (
        ('Job Information', {
            'fields': ('title', 'title_marathi', 'description', 'description_marathi', 'image')
        }),
    )

# Contact Admin
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'company_name', 'phone', 'email', 'inquiry_type', 'created_at')
    list_filter = ('inquiry_type', 'created_at')
    search_fields = ('name', 'company_name', 'phone', 'email', 'subject')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'company_name', 'phone', 'email')
        }),
        ('Inquiry Details', {
            'fields': ('inquiry_type', 'subject', 'message')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
