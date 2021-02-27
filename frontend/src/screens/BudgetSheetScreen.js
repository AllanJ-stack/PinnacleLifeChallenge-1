import React, { useEffect, useState } from 'react';
import {setNextYearAction} from '../actions/AdminActions'
//import { Link } from 'react-router-dom';
//import { signin } from '../actions/userActions';
//import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { budgetSheetlist } from "../actions/BudgetSheetActions";




export default function BudgetSheetScreen() {
    const dispatch = useDispatch();
    const budgetSheetListing = useSelector((state) => state.budgetSheetListing);

  const [budgetDetails, setBudgetDetails] = useState({});
  //const { loading, error, products } = budgetSheetListing;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo.id;
 

  useEffect(() => {
      console.log("HI---")
    dispatch(budgetSheetlist(userId));
  }, []);


  return (
    <div>
      <div className="form">
        <div>
          <h1>Budget Sheet</h1>
        </div>
        <div>
        <h3>Current Year: </h3>
        </div>
        <div>
          
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}