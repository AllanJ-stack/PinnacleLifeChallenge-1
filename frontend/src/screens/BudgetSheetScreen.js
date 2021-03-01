import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { budgetSheetlist } from "../actions/BudgetSheetActions";
import BudgetSheet from '../components/BudgetSheet'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function BudgetSheetScreen() {
  const dispatch = useDispatch();
  const budgetSheetListing = useSelector((state) => state.budgetSheetListing);
  const { budgetDetails, loading, error } = budgetSheetListing

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo.id;
  
console.log(userId)


  useEffect(() => {
    dispatch(budgetSheetlist(userId));
  }, [dispatch, userId]);

console.log(budgetDetails)

  return (
    <div>
    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
    {!loading && !error && userInfo &&
    <>
    <div className="row center">
     
    
          {Object.entries(budgetDetails).map(([year, yearRecord]) => (
            <BudgetSheet key={Math.random()}yearRecord={yearRecord}></BudgetSheet>

          ))}
          
        </div>
          </>
      } 
    </div>    
  );
}