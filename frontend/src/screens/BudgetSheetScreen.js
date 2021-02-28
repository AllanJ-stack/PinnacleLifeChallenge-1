import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { budgetSheetlist } from "../actions/BudgetSheetActions";
import BudgetSheet from '../components/BudgetSheet'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function BudgetSheetScreen() {
  const dispatch = useDispatch();
  const budgetSheetListing = useSelector((state) => state.budgetSheetListing);
  const { loading, error, budgetDetails } = budgetSheetListing
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo.id;
  


  useEffect(() => {
    console.log("change detected")
    console.log(budgetSheetListing)
  }, [budgetSheetListing]);

  useEffect(() => {
    dispatch(budgetSheetlist(userId));
  }, [dispatch, userId]);


  return (
    <div>
    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
    {!loading && !error && userId &&
    <>
    <div className="row center">

          {Object.entries(budgetDetails).map(([year, yearRecord]) => (
            <BudgetSheet yearRecord={yearRecord}></BudgetSheet>

          ))}
          
        </div>
          </>
      } 
    </div>    
  );
}