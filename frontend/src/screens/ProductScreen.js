import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { detailsProduct } from '../actions/productActions';
 import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import Axios from "axios";
import { useSelector } from 'react-redux';

export default function ProductScreen(props) {
  const productId = props.match.params.id;
  const userCompany = productId.substr(0, 3);
  
  const [productDetails, setProductDetails] = useState({});
  const [qty, setQty] = useState(1);
  
  
  const getProductDetails = async (productId) => {
    const yearRes= await Axios.get('/year.json')
    const year = yearRes.data.session;
    
    console.log(userCompany)
    console.log(year)
    console.log(productId)

    
    const { data } = await Axios.get(`/product/${userCompany}/${year}.json?orderBy="_id"&equalTo="${productId}"`); // "get product details from product id"
    console.log(data)
    const product = data[productId];
    
    console.log(product);
     return product;
  };

  useEffect(() => {
    console.log("hi");
    getProductDetails(productId).then((productDetails) => {
      console.log(
        "Here's the productDetails that will be saved into productDetails state:"
      );
      console.log(productDetails);
      setProductDetails(productDetails);
      
    });
  }, []);

  // set path once add to cart
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  
  return (

    <div>

      {Object.keys(productDetails).length !== null ? (
      
         <div>
            <Link to="/products">Back to result</Link>
            <div className="row top">
              <div className="col-1">

                <img className="large" src={productDetails.image} alt={productDetails.name}></img>
              </div>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>Product Name: {productDetails.name}</h1>
                  </li>
                  <li><b>Price :</b> ${productDetails.priceValue}</li>
                  <li>
                    <b>Description:</b>
                    <p>{productDetails.description}</p>
                  </li>
                  <li>
                    <b>1st Year payment:</b>
                    <p>${productDetails.fPrice} (Downpayment, Loan, Insurance and Maintenance)</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">${productDetails.fPrice}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        <div>
                          {productDetails.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                              <span className="danger">Unavailable</span>
                            )}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Stock left</div>
                        <div className="stockcount">{productDetails.countInStock}</div>
                      </div>
                    </li>
                    {productDetails.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(productDetails.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}> 
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}

                    
                  </ul>

                </div>
              </div>
            </div>
            </div>
        
      ) : (
        <LoadingBox></LoadingBox>
      ) }
    </div>
  );
}





// export default function ProductScreen(props) {
//   const dispatch = useDispatch();
//   const productId = props.match.params.id;
//   const [qty, setQty] = useState(1); //default value is 1.
//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;

  


//   //
//   useEffect(() => {
//     dispatch(detailsProduct(productId));
//   }, [dispatch, productId]);



//   // set path once add to cart
//   const addToCartHandler = () => {
//     props.history.push(`/cart/${productId}?qty=${qty}`);
//   };
  
//   return (
//     <div>
//       {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (
//         <div>
//             <Link to="/products">Back to result</Link>
//             <div className="row top">
//               <div className="col-1">

//                 <img className="large" src={product.image} alt={product.name}></img>
//               </div>
//               <div className="col-1">
//                 <ul>
//                   <li>
//                     <h1>Product Name: {product.name}</h1>
//                   </li>
//                   <li><b>Price :</b> ${product.priceValue}</li>
//                   <li>
//                     <b>Description:</b>
//                     <p>{product.description}</p>
//                   </li>
//                   <li>
//                     <b>1st Year payment:</b>
//                     <p>${product.fPrice} (Downpayment, Loan, Insurance and Maintenance)</p>
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-1">
//                 <div className="card card-body">
//                   <ul>
//                     <li>
//                       <div className="row">
//                         <div>Price</div>
//                         <div className="price">${product.fPrice}</div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="row">
//                         <div>Status</div>
//                         <div>
//                           {product.countInStock > 0 ? (
//                             <span className="success">In Stock</span>
//                           ) : (
//                               <span className="danger">Unavailable</span>
//                             )}
//                         </div>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="row">
//                         <div>Stock left</div>
//                         <div className="stockcount">{product.countInStock}</div>
//                       </div>
//                     </li>
//                     {product.countInStock > 0 && (
//                     <>
//                       <li>
//                         <div className="row">
//                           <div>Qty</div>
//                           <div>
//                             <select
//                               value={qty}
//                               onChange={(e) => setQty(e.target.value)}
//                             >
//                               {[...Array(product.countInStock).keys()].map(
//                                 (x) => (
//                                   <option key={x + 1} value={x + 1}> 
//                                     {x + 1}
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           </div>
//                         </div>
//                       </li>
//                       <li>
//                         <button
//                           onClick={addToCartHandler}
//                           className="primary block"
//                         >
//                           Add to Cart
//                         </button>
//                       </li>
//                     </>
//                   )}

                    
//                   </ul>

//                 </div>
//               </div>
//             </div>
//             </div>
            
//       )}
//     </div>
//   );
// }