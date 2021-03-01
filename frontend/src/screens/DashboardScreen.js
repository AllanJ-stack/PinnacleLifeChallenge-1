import React, { useEffect, useState } from 'react';
import {setNextYearAction} from '../actions/AdminActions'
import Axios from 'axios';
import { useDispatch } from 'react-redux';

export default function YearScreen() {
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
        <h3>Current Year: {yearDetails}</h3>
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
      </div>
    </div>
  );
}