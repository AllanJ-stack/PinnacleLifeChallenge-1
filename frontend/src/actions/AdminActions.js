import Axios from 'axios';


export const setYearAction = (yearDetails) => async (dispatch) => {
    dispatch({ payload: yearDetails });
    console.log("action" + yearDetails)
    const res = await Axios.patch('/year.json', yearDetails)
    return res;
}