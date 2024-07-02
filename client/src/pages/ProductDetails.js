import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css"

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);

  //initapl details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async(pid,cid)=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="row container m-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="400px"
            width="30px"
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price : 
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
            {/* {product?.price} */}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products Found</p>}
        <div className='d-flex flex-wrap'>
          {relatedProducts?.map((p) => (
                <div className="card m-2" key={p._id} style={{ width: "18rem"}}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text"> ₹ {p.price}</p>
            
                    <button className='btn btn-primary ms-2'
                     onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className='btn btn-secondary ms-2'>Add To Cart</button>
                  
                  
                  </div>
                </div>
              
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
