import React, { useEffect, useState } from 'react';
import {setNextYearAction} from '../actions/AdminActions'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import AdminBudgetSheet from '../components/AdminBudgetSheet'

const prevYears = (currentYear) => {
	let prevYearsArr = []
  let currentYearDigit = Number(currentYear.substr(-1))
  console.log("prevYears")
  if (currentYearDigit===1){

  return prevYearsArr
  }
  for (let i=1; i<currentYearDigit; i++){
  
  prevYearsArr.push(`Y0${i}`)

  
  }
	return prevYearsArr
}



export default function YearScreen() {
  
  
const [allUsersBudgetDetails, setAllUsersBudgetDetails] = useState({}) // default as empty object


// To get a list of all available users (with records)
const getUsers = async () => {
	const usersRes = await Axios.get(`users.json`) // double check if correct
  const usersObj = usersRes.data
  const usersArray = Object.keys(usersObj) // returns the keys of this usersObj, which is essentially an array of the users
  return usersArray // this returns something like ["BHA001", "GEC001"]
}

// Previously you had this function. You can either import it or just copy paste the same function here...
const getBudgetDetails = async (userId) => {
  const yearRes = await Axios.get("/year.json");
  const year = yearRes.data.session;

  const userCompany = userId.substr(0, 3);
  console.log(userCompany)
  //console.log(year)

  
  console.log(userId);
  const userRes = await Axios.get(`/users/${userId}.json`)
  const userRecords = userRes.data
  console.log(userRecords)

  

  // To store the budget details for the respective years
let budgetDetails = {}

// 1. Get the current year (Line 26)

// Loop through each of the available years
const prevYearsArr = prevYears(year)
for (let prevYear of prevYearsArr){
console.log(prevYear)
// 2. For every previous year

// Template for each year
budgetDetails[prevYear] = {
  "year": prevYear,
  "userId": userId,
  "salary": 0,
  "total_commission":0,
  "total_income": 0,
  "total_expense": 0,
  "nett_worth": 0,
  // Extra identification for expenses
  "education_expenses": 0,
  "property_expenses": 0
  }


// ================================TO GET TOTAL INCOME VALUES===============================
// a. Get current year Salary
const currYearSalaryRes = await Axios.get(`/companies/${userCompany}/salary/${prevYear}.json`) 
const currYearSalary = currYearSalaryRes.data

budgetDetails[prevYear].salary = currYearSalary


 // b. Get Total Commission from items sold for this year
 let totalCommission = 0
  console.log(userRecords.sell_trans[prevYear])
  console.log(userRecords)

 if(userRecords.sell_trans[prevYear]){
   for(let [productId, productRecord] of Object.entries(userRecords.sell_trans[prevYear])){
    console.log(productId)
   // For every items sold
   // i. Get the commision amt for this item
   
   const productCommissionRes = await Axios.get(`companies/${userCompany}/commission/${prevYear}/${productId}.json`)
   const productCommission = productCommissionRes.data;
   console.log("product commission" + productCommission)
   
  
  // ii. Multiply by the quantity of item to get the total commision of this item
   // to sum up the total quantity of product
   let totalProductQty = 0
   for(let [userId,qty] of Object.entries(productRecord)){ // To get the total quantity sold for this product
     totalProductQty += qty
     
   }
  console.log(`Income: The total quantity of product(${productId}) sold is ${totalProductQty}`)
   // To get the total commision of this item
 let totalProductCommission = productCommission * totalProductQty
   console.log(`Total Commision of ${productId} is ${totalProductCommission}`)
  totalCommission += totalProductCommission
  
   }
   // Save Total Commisions to budgetDetails
   budgetDetails[prevYear].total_commission = totalCommission
  
 }

 // c. Sum up Total Income = Salary + Total Commission
 let totalIncome = 0
 totalIncome = currYearSalary + totalCommission
// Save to budgetDetails
 budgetDetails[prevYear].total_income = totalIncome



 // ================================TO GET TOTAL EXPENSES VALUES===============================
 // d. Get Total Expense from items bought for this year
 let totalExpense = 0 

 if(userRecords.buy_trans[prevYear]){
   for(let [productId,productRecord] of Object.entries(userRecords.buy_trans[prevYear])){
   // For every item bought
  // i. Get the cost amount for this particular item
  console.log(productId)
  const productCostRes =  await Axios.get(`product/${userCompany}/${prevYear}/${productId}/priceValue.json`)
  const productCost = productCostRes.data
  // ii. Multiply by the quantity of item to get the total expense of this item
  // For me to sum up the total quantity of product
  let totalProductQty = 0
  for(let [userId,qty] of Object.entries(productRecord)){ // To get the total quantity bought for this product
    totalProductQty += qty
  }
  console.log(`Expense: The total quantity of product(${productId}) bought is ${totalProductQty}`)
  // To get the Total Expense of this item
  let totalProductExpense = productCost * totalProductQty
  console.log(`Total Expense of ${productId} is ${totalProductExpense}`)
  totalExpense += totalProductExpense
  
  }
  // Save Total Expense to budgetDetails
  budgetDetails[prevYear].total_expense = totalExpense
  
}



// ====================================TO CALCULATE NETT WORTH===================================
// Net Worth = Total Income - Total Expense
let nettWorth = 0
nettWorth = totalIncome - totalExpense
budgetDetails[prevYear].nett_worth = nettWorth




// End of code for prevYear
//  ===============================================================================================
}
console.log(budgetDetails)
return budgetDetails
 
}

const getAllUsersBudgetDetails = async (listOfUsers)=> {
	let usersBudgetDetails = {}
	for (let userId of listOfUsers){
        let userBudgetDetail = await getBudgetDetails(userId)
        console.log(userBudgetDetail)
        usersBudgetDetails[userId] = userBudgetDetail // Store this user's budget details
      console.log(usersBudgetDetails)

      }
      
  return usersBudgetDetails // return
}

useEffect(() => {
    console.log("use Effect")
    

    getUsers().then((listOfUsers) => getAllUsersBudgetDetails(listOfUsers)).then((allUsersBudgetDetails)=>{
    setAllUsersBudgetDetails(allUsersBudgetDetails)
    console.log(allUsersBudgetDetails)
    });
  }, []);
  
  
  
  const [yearDetails, setYearDetails] = useState('');
 
  const getYearDetails = async () => {
    const yearRes = await Axios.get('/year.json')
   const year = yearRes.data.session;
    console.log(year)
    return year;
  };
  const dispatch = useDispatch();
  const increaseYearHandler = () => {
    //e.preventDefault();
    let newYear = increasedYear(yearDetails)
    console.log("Hello new year" + newYear)
    dispatch(setNextYearAction(newYear));
  };

  const increasedYear = (year) => {
    let currentYearDigit = Number(year.substr(-1))
    let newYear = String(currentYearDigit + 1)
    let newYearFormattedString = year.replace(currentYearDigit, newYear)
    return newYearFormattedString
  }

  useEffect(() => {
    console.log("hi");
    getYearDetails().then((yearDetails) => {
      console.log(
        "Here's the productDetails that will be saved into productDetails state:"
      );
      console.log(yearDetails);
      setYearDetails(yearDetails);
      
    });
  }, []);


  return (
    <div>
      <div className="form">
        <div>
          <h1>Admin Dashboard</h1>
        </div>
        <div>
        <h3 onChange>Current Year: {yearDetails}</h3>
        </div>
        <div>
          <label htmlFor="yearText">Set Year</label>
          {/* <input
            type="text"
            id="yearText"
            placeholder="Enter Year (E.g. Y01, Y02, Y03)"
          ></input> */}
        </div>
        <div>
          <label />
          <button className="primary" onClick={() =>increaseYearHandler()}>
            Next Year
          </button>
        </div>
        <div>
          <label />
        </div>
        <>
    <div className="row center">
     
    {Object.entries(allUsersBudgetDetails).map(([userId, userBudgetDetails]) => (
	    Object.entries(userBudgetDetails).map(([year, yearBudgetDetails])=>(
        <AdminBudgetSheet key={Math.random()}yearBudgetDetails={yearBudgetDetails}></AdminBudgetSheet>
      ))))}

          
        </div>
          </>


      </div>
    </div>
  );
}

