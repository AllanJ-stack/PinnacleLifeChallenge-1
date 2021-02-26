import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = (userId) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  try {
    const yearRes = await Axios.get("/year.json");
    const year = yearRes.data.session;
    const { data } = await Axios.get(`/product/${userId}/${year}.json`);
    console.log("Data sent:");
    console.log(data);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (year, productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const userCompany = productId.substr(0, 3);
    const { data } = await Axios.get(
      `/product/${userCompany}/${year}.json?orderBy="_id"&equalTo="${productId}"`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const processBarcode = (barcode) => async (dispatch ) => {
  dispatch ({type: PRODUCT_DETAILS_REQUEST, payload: barcode})
  try{
    const { data } = await Axios.get(`/product/${barcode}.json`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

  } catch (error){
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
};