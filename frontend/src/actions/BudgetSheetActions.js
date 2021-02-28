import Axios from "axios";
import {
  BUDGETSHEET_FAIL,
  BUDGETSHEET_REQUEST,
  BUDGETSHEET_SUCCESS,

} from "../constants/BudgetSheetConstants";

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

export const budgetSheetlist = (userId) => async (dispatch) => {
  dispatch({ type: BUDGETSHEET_REQUEST  });
console.log("In budgetSheetlist")
  try {
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
  // let currYearSalary = 0
  const currYearSalaryRes = await Axios.get(`/companies/${userCompany}/salary/${prevYear}.json`) 
  const currYearSalary = currYearSalaryRes.data
  console.log(currYearSalary)

  budgetDetails[prevYear].salary = currYearSalary

  console.log(budgetDetails)
  
  
   // b. Get Total Commission from items sold for this year
   let totalCommission = 0
    console.log(userRecords.sell_trans[prevYear])
    console.log(userRecords)

   if(userRecords.sell_trans[prevYear]){
     for(let [productId, productRecord] of Object.entries(userRecords.sell_trans[prevYear])){
      console.log(productId)
     // For every items sold
     // i. Get the commision amt for this item
     //let productCommission = 150 // to be replaced -- get from firebase with axios.get.... with productId
     
     const productCommissionRes = await Axios.get(`companies/${userCompany}/commission/${prevYear}/${productId}.json`)
     const productCommission = productCommissionRes.data;
     console.log("product commission" + productCommission)
     
    
    // ii. Multiply by the quantity of item to get the total commision of this item
	 	// For me to sum up the total quantity of product
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
    //let productCost = 150 // to be replaced -- get product cost from firebase with axios.get.... with productId and particular prev year
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

     dispatch({ type: BUDGETSHEET_SUCCESS, payload: budgetDetails });
  } catch (error) {
    dispatch({ type: BUDGETSHEET_FAIL, payload: error.message });
  }
};