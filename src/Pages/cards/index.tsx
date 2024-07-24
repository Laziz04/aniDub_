import React, { useState, useEffect } from "react";
import "./cards.css";
import { FaHeart, FaRegEye } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import { BiSolidLike } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";
import "./cards.css";

interface Product {
  id: number;
  name: string;
  img: string;
  views: number;
  data: number;
  type: string; // Assuming there is a type field to filter by
}

const api = axios.create({
  baseURL: "https://6d548820c3f18dbd.mokky.dev",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your_access_token",
  },
});

const Cards: React.FC<{ filter: string }> = ({ filter }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(10);

  useEffect(() => {
    api
      .get<Product[]>("Cards")
      .then((response: AxiosResponse<Product[]>) => {
        setAllProducts(response.data);
        setDisplayedProducts(response.data.slice(0, 10));
      })
      .catch((error: any) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) => {
      if (filter === "all") return true;
      return product.type === filter;
    });
    setDisplayedProducts(filteredProducts.slice(0, visibleCount));
  }, [filter, allProducts, visibleCount]);

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 5;
    setVisibleCount(newVisibleCount);
    setDisplayedProducts(allProducts.slice(0, newVisibleCount));
  };

  return (
    <div className="pons mt-5">
      <div className="flex never justify-center" style={{ flexWrap: "wrap" }}>
        {error && <div className="col-span-full">Error: {error}</div>}
        {displayedProducts.map((product) => (
          <CSSTransition key={product.id} timeout={500} classNames="card">
            <div className="Ser_card" key={product.id}>
              <div className="section_card">
                <div className="span_container">
                  <span className="card_span">{product.data}</span>
                  <span className="card_span2">
                    <FaHeart />
                  </span>
                </div>
                <img
                  src={product.img}
                  alt="Card image"
                  className="card-image"
                />
                <div className="card-body">
                  <p className="card-text">{product.name}</p>
                  <div className="card_span3 flex gap-1 items-center">
                    <FaRegEye />
                    <span id="Ko'rishlar_soni">{product.views}</span>
                  </div>
                  <BiSolidLike className="card_span4" />
                </div>
              </div>
            </div>
          </CSSTransition>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex justify-center mt-3">
          <button className="buuton_hover" onClick={handleLoadMore}>
            Koproq ko'rsatish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
