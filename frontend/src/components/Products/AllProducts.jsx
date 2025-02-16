
import { useTranslation } from "react-i18next";
import { GrCircleAlert } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const AllProducts = ({ products }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProductSelect = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate(`/product_details/${product.id}`);
  };

  return (
    <div className="w-full mt-20 lg:mt-[120px] md:mt-[120px] pb-8">
     <div className="w-full px-4 md:px-10 lg:px-14 border-b border-gray-400 lg:pb-8 md:pb-5 py-4 lg:py-0">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
           {t("allProducts.title")}
         </h2>
       </div>
       {products.length === 0 ? (

           <div className="w-full h-64 flex items-center justify-center">
                   <div className="bg-purple-50 border-l-4 border-[#502380] p-8 rounded-lg max-w-lg mx-4">
                     <div className="flex items-center gap-4 mb-3">
                       <GrCircleAlert className="w-8 h-8 text-black" />
                       <h3 className="text-xl font-semibold text-black">  No Products Available</h3>
                     </div>
                     <p className="text-gray-600"> We're currently updating our product catalog. Please check back later for our latest offerings.
                     </p>
                   
                   </div>
                   </div>

       
     ) : (
      <div className="px-8 lg:px-20 lg:gap-16 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 mx-auto">
        {products.map((product) => (
          <div key={product.id} className="w-50 bg-white shadow-md rounded-lg border border-zinc-400 overflow-hidden transform">
            <img
              onClick={() => handleProductSelect(product)}
              src={product.mainImage}
              alt={product.name}
              className="w-76 bg-center h-55 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6 md:p-8">
            <h2 className="uppercase md:text-2xl lg:text-3xl text-2xl font-semibold text-[#502380]">
                   {product.name}
                 </h2>
                 <h2 className="uppercase md:text-xl text-lg lg:text-2xl font-semibold">
                   {product.model}
                 </h2>
                 <h2 className="uppercase md:text-2xl text-2xl lg:text-3xl font-semibold my-4 ">
                   ₹{product.price}
                 </h2>
              <button
                onClick={() => handleProductSelect(product)}
                className="px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-base md:text-lg bg-[#502380] text-white transition-colors"
              >
                {t("allProducts.viewDetails")}
              </button>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};
export default AllProducts;