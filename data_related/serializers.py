# serializers.py
from rest_framework import serializers
from .models import Product, AdditionalImage, FeatureImage, Booking, JobOpening, JobApplication, Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'name',
            'company_name',
            'phone',
            'email',
            'inquiry_type',
            'subject',
            'message'
        ]
    
    def validate_phone(self, value):
        # Additional validation can be added here if needed
        return value

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'

class JobOpeningSerializer(serializers.ModelSerializer):
    title_display = serializers.SerializerMethodField()
    description_display = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = JobOpening
        fields = [
            'id',
            'title_display',
            'description_display',
            'image_url'
        ]

    def get_title_display(self, obj):
        language = self.context['request'].query_params.get('lang', 'en')
        return obj.title_marathi if language == 'mr' else obj.title

    def get_description_display(self, obj):
        language = self.context['request'].query_params.get('lang', 'en')
        return obj.description_marathi if language == 'mr' else obj.description

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'booking_number', 'name', 'email', 'phone', 'alternate_phone',
            'address', 'city', 'state', 'pincode', 'product', 'quantity',
            'unit_price', 'tax_amount', 'installation_required',
            'installation_address', 'created_at', 'updated_at'
        ]
        read_only_fields = ['booking_number', 'created_at', 'updated_at']

class AdditionalImageSerializer(serializers.ModelSerializer):
    caption_display = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = AdditionalImage
        fields = ['image', 'caption_display']

    def get_caption_display(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.caption_marathi if lang == 'mr' and obj.caption_marathi else obj.caption

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class FeatureImageSerializer(serializers.ModelSerializer):
    caption_display = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = FeatureImage
        fields = ['image', 'caption_display']

    def get_caption_display(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.caption_marathi if lang == 'mr' and obj.caption_marathi else obj.caption

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def to_representation(self, instance):
        # Ensure we're returning both features and benefits captions correctly
        data = super().to_representation(instance)
        index = list(instance.product.feature_images.all()).index(instance)
        data['type'] = 'Features' if index == 0 else 'Benefits'
        return data

class ProductDetailSerializer(serializers.ModelSerializer):
    name_display = serializers.SerializerMethodField()
    model_display = serializers.SerializerMethodField()
    description_display = serializers.SerializerMethodField()
    main_image = serializers.SerializerMethodField()
    technical_details_display = serializers.SerializerMethodField()
    yt_tagline_display = serializers.SerializerMethodField()
    booking_tagline_display = serializers.SerializerMethodField()
    demo_tagline_display = serializers.SerializerMethodField()
    technical_details_application_display = serializers.SerializerMethodField()
    technical_details_brand_name_display = serializers.SerializerMethodField()
    technical_details_model_name_display = serializers.SerializerMethodField()
    additional_images = serializers.SerializerMethodField()
    feature_images = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
            'id', 'name_display', 'model_display', 'description_display',
            'main_image', 'additional_images', 'feature_images',
            'price', 'discounted_price', 'discount_percentage',
            'tax_rate', 'installation_cost', 'warrenty',
            'yt_link', 'yt_tagline_display',
            'booking_tagline_display',
            'technical_details_display',
            'technical_details_model_name_display',
            'technical_details_brand_name_display',
            'technical_details_application_display',
            'demo_tagline_display', 'demo_yt_link',
            'status', 'stock_quantity',
            'min_order_quantity', 'max_order_quantity',
        ]

    def get_field_display(self, obj, field_name, marathi_field_name):
        lang = self.context.get('lang', 'en')
        marathi_value = getattr(obj, marathi_field_name, None)
        return marathi_value if lang == 'mr' and marathi_value else getattr(obj, field_name)

    def get_name_display(self, obj):
        return self.get_field_display(obj, 'name', 'name_marathi')

    def get_model_display(self, obj):
        return self.get_field_display(obj, 'model', 'model_marathi')

    def get_description_display(self, obj):
        return self.get_field_display(obj, 'description', 'description_marathi')

    def get_technical_details_display(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.technical_details_marathi if lang == 'mr' and obj.technical_details_marathi else obj.technical_details

    def get_yt_tagline_display(self, obj):
        return self.get_field_display(obj, 'yt_tagline', 'yt_tagline_marathi')

    def get_booking_tagline_display(self, obj):
        return self.get_field_display(obj, 'booking_tagline', 'booking_tagline_marathi')

    def get_demo_tagline_display(self, obj):
        return self.get_field_display(obj, 'demo_tagline', 'demo_tagline_marathi')

    def get_technical_details_application_display(self, obj):
        return self.get_field_display(obj, 'technical_details_application', 'technical_details_application_marathi')

    def get_technical_details_brand_name_display(self, obj):
        return self.get_field_display(obj, 'technical_details_brand_name', 'technical_details_brand_name_marathi')

    def get_technical_details_model_name_display(self, obj):
        return self.get_field_display(obj, 'technical_details_model_name', 'technical_details_model_name_marathi')

    def get_main_image(self, obj):
        request = self.context.get('request')
        if obj.main_image and request:
            return request.build_absolute_uri(obj.main_image.url)
        return None
    
    def get_additional_images(self, obj):
        # Ensure we always get exactly 3 images in order
        images = obj.additional_images.all()[:3]
        serializer = AdditionalImageSerializer(images, many=True, context=self.context)
        return serializer.data
    
    def get_feature_images(self, obj):
        # Ensure we always get exactly 2 images in order
        images = obj.feature_images.all()[:2]
        serializer = FeatureImageSerializer(images, many=True, context=self.context)
        return serializer.data

class ProductListSerializer(serializers.ModelSerializer):
    name_display = serializers.SerializerMethodField()
    model_display = serializers.SerializerMethodField()
    main_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name_display', 'model_display', 
            'main_image', 'price', 'discounted_price'
        ]
    
    def get_main_image(self, obj):
        if obj.main_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.main_image.url)
            return obj.main_image.url
        return None
    
    def get_name_display(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.name_marathi if lang == 'mr' and obj.name_marathi else obj.name
    
    def get_model_display(self, obj):
        lang = self.context.get('lang', 'en')
        return obj.model_marathi if lang == 'mr' and obj.model_marathi else obj.model
