import React from "react";
import { useTranslation } from "react-i18next";
import { GrCircleAlert } from "react-icons/gr";

const AllProducts = ({ products, onSelectProduct }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full pt-20 lg:pt-[120px] md:pt-[120px] pb-8">
      <div className="w-full px-4 md:px-10 lg:px-14 border-b border-gray-400 lg:pb-8 md:pb-5 pb-4">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
          {t("allProducts.title")}
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <GrCircleAlert className="text-9xl mb-6 text-gray-400" />
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
            No Products Available
          </h3>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
            We're currently updating our product catalog. Please check back later for our latest offerings.
          </p>
        </div>
      ) : (
        <div className="px-8 lg:px-20 lg:gap-16 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-50 bg-white shadow-md rounded-lg overflow-hidden transform"
            >
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-76 bg-center h-55 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 md:p-8">
                <h2 className="uppercase md:text-xl lg:text-2xl text-lg font-semibold">
                  {product.name}
                </h2>
                <h2 className="uppercase md:text-xl text-lg lg:text-2xl font-semibold">
                  {product.model}
                </h2>
                <h2 className="uppercase md:text-xl text-lg lg:text-2xl font-semibold mb-4">
                  ₹{product.price}
                </h2>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-base md:text-lg hover:bg-[#502380] hover:text-white transition-colors"
                >
                  {t("allProducts.viewDetails")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;