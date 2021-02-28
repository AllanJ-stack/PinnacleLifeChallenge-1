import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

export default function ProductHomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo.company;
 console.log(productList);


  useEffect(() => {
    dispatch(listProducts(userId));
  }, [dispatch, userId]);

  return (
    <div>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {!loading && !error && !userInfo &&
        <>
          <div>Please sign in... what ever u want</div>
        </>
      }
      {!loading && !error && userInfo &&
        <>
          <div className="row center">
            {Object.entries(products).map(([productId, product]) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      }
    </div>
  );
}