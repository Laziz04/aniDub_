import React, { useState, useEffect } from "react";
import { FaHeart, FaRegEye } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import { BiSolidLike } from "react-icons/bi";

interface Product {
  id: number;
  name: string;
  img: string;
  views: number;
  data: number;
}

const api = axios.create({
  baseURL: "https://6d548820c3f18dbd.mokky.dev",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_access_token",
  },
});

const Cards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Product[]>("Cards")
      .then((response: AxiosResponse<Product[]>) => {
        setProducts(response.data);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  }, []);

  const handleClick = () => {
    alert("Click to purchase product to purchase a new product ");
  };

  return (
    <div className="px-4 lg:px-12 xl:px-14">
      <section className="mt-5">
        <div className="flex flex-wrap gap-3 justify-center">
          {error && <div>Error: {error}</div>}
          {products.map((product) => (
            <div
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mt-2"
              key={product.id}
            >
              <div className="relative w-[220px] h-[320px] overflow-hidden rounded-lg transition-transform duration-300 shadow-md hover:scale-105">
                <div className="absolute top-1.5 left-1.5 w-14 h-6 text-white bg-orange-500 rounded-md flex items-center justify-center text-sm">
                  {product.data}
                </div>
                <div className="absolute top-1.5 right-1.5 text-white cursor-pointer p-1.5 rounded-md">
                  <FaHeart />
                </div>
                <img
                  src={product.img}
                  alt="Card image"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 w-full h-1/3 bg-black bg-opacity-70 text-white flex flex-col items-center opacity-0 transition-opacity duration-500 transform translate-y-full hover:opacity-100 hover:translate-y-0 p-2.5">
                  <p className="absolute left-2 text-base opacity-0 transform translate-y-5 transition-opacity duration-500 hover:opacity-100 hover:translate-y-0">
                    {product.name}
                  </p>
                  <div className="absolute bottom-5 left-1.5 flex gap-1 items-center">
                    <FaRegEye />
                    <span id="Ko'rishlar_soni">{product.views}</span>
                  </div>
                  <BiSolidLike className="absolute bottom-4 right-2 text-xl cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex justify-center mt-3">
            <button
              className="text-center flex justify-center py-2 px-3 w-full h-10 opacity-0 text-cyan-500 border-2 border-cyan-500 rounded-lg hover:text-white hover:bg-cyan-500 transition duration-200"
              onClick={handleClick}
            >
              Koproq ko'rsatish
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cards;
