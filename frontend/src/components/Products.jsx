import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllProducts from './Products/AllProducts';
import Details from './Products/Details';
import { useTranslation } from "react-i18next";
import api from './api';
import { GrCircleAlert } from "react-icons/gr";

function Products() {
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userLang = sessionStorage.getItem('currentLanguage') || 'en';
        const response = await axios.get(`https://${api}products/?lang=${userLang}`);
        
        const transformedProducts = response.data.map(product => ({
          id: product.id,
          name: product.name_display,
          model: product.model_display,
          mainImage: product.main_image,
          price: product.price,
        }));
        
        setProducts(transformedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 const PageHeader = () => (
     <div className="w-full px-4 md:px-10 lg:px-14 border-b border-gray-400 lg:pb-8 md:pb-5 pb-4">
       <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
         {t("allProducts.title")}
       </h2>
     </div>
   );
 
   if (loading) {
     return (
       <div className="w-full pt-20 lg:pt-[120px] md:pt-[120px] pb-8">
         <PageHeader />
         <div className="w-full h-[60vh] flex items-center justify-center">
           <div className="relative w-12 h-1">
             <div className="absolute top-0 left-0 w-full h-full border-4 border-[#502380]/30 rounded-full"></div>
             <div className="absolute top-0 left-0 w-full h-full border-4 border-[#502380] rounded-full animate-spin border-t-transparent"></div>
           </div>
         </div>
       </div>
     );
   }
 
   if (error) {
     return (
       <div className="w-full pt-24 lg:pt-[120px] md:pt-[120px] pb-8">
         <PageHeader />
         <div className="w-full h-64 flex items-center justify-center">
           <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg max-w-lg mx-4">
             <div className="flex items-center gap-4 mb-3">
               <GrCircleAlert className="w-8 h-8 text-red-500" />
               <h3 className="text-xl font-semibold text-red-700">Error</h3>
             </div>
             <p className="text-red-600">{error}</p>
             <button 
               onClick={() => window.location.reload()}
               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
             >
               Try Again
             </button>
           </div>
         </div>
       </div>
     );
   }
 
  return (
    <div className='w-full min-h-screen bg-white'>
      {selectedProduct ? (
        <Details
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <AllProducts
          products={products}
          onSelectProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

export default Products;