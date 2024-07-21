import React, { useState, useEffect } from "react";
import "./cards.css";
import { FaHeart, FaRegEye } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import { wrap } from "module";
import { Alert } from "react-bootstrap";
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
    <div>
      <section className="container mt-5">
        <div className=" row  gap-5 justify-center w-full">
          {error && <div>Error: {error}</div>}
          {products.map((product) => (
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-2 Ser_card"
              key={product.id}
            >
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
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex justify-center mt-3">
            <button className="buuton_hover" onClick={handleClick}>
              Koproq ko'rsatish
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cards;
