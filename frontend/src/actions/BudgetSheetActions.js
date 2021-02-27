import Axios from "axios";
import {
  BUDGETSHEET_FAIL,
  BUDGETSHEET_REQUEST,
  BUDGETSHEET_SUCCESS,

} from "../constants/BudgetSheetConstants";

const prevYears = (currentYear) => {
	let prevYearsArr = []
	let currentYearDigit = Number(currentYear.substr(-1))
  if (currentYearDigit===1){
  return prevYearsArr
  }
  for (let i=1; i<currentYearDigit; i++){
  prevYearsArr.push(`Y0${i}`)
  }
	return prevYearsArr
}

export const budgetSheetlist = (userId) => async (dispatch) => {
  dispatch({ type: BUDGETSHEET_REQUEST });
console.log("YUUUPPY")
  try {
    const yearRes = await Axios.get("/year.json");
    const year = yearRes.data.session;
    //console.log(year)
    prevYears(year).forEach((prevYear)=>{
        console.log(prevYear)
    })
    
    console.log(userId);
    const userRes = await Axios.get(`/users/${userId}.json`)
    const userRecords = userRes.data
    console.log(userRecords)


    // For each user(student) that has records under 'users'
    // for ( let [userId, userRecord] of Object.entries(usersRecords)) {

    // }

    // const { data } = await Axios.get(`/product/${userId}/${year}.json`);
    // console.log("Data sent:");
    // console.log(data);
    // dispatch({ type: BUDGETSHEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BUDGETSHEET_FAIL, payload: error.message });
  }
};