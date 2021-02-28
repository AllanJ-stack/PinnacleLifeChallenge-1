import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { budgetSheetlist } from "../actions/BudgetSheetActions";
import BudgetSheet from '../components/BudgetSheet'


export default function BudgetSheetScreen() {
  const dispatch = useDispatch();
  const budgetSheetListing = useSelector((state) => state.budgetSheetListing);
  const { budgetDetails } = budgetSheetListing
  //const [budgetDetails, setBudgetDetails] = useState({});


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo.id;
 
  console.log(budgetSheetListing)

  useEffect(() => {
    dispatch(budgetSheetlist(userId));
  }, [dispatch, userId]);

  // console.log(budgetSheetListing)

  return (
    <div className="row center">
          {Object.entries(budgetDetails).map(([year, yearRecord]) => {
            <BudgetSheet key={Math.random} yearRecord={yearRecord}></BudgetSheet>

          })}
        </div>
  );
}