import React, { useEffect, useState } from 'react';
import {setYearAction} from '../actions/AdminActions'
//import { Link } from 'react-router-dom';
//import { signin } from '../actions/userActions';
//import LoadingBox from '../components/LoadingBox';
//import MessageBox from '../components/MessageBox';
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
  const submitYearHandler = (e) => {
    e.preventDefault();
    dispatch(setYearAction(yearDetails));
  };


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
      <form className="form" onSubmit={submitYearHandler}>
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
          <button className="primary" type="submit" onClick={(e) =>dispatch(setYearAction(setYearDetails))}>
            Next Year
          </button>
        </div>
        <div>
          <label />
        </div>
      </form>
    </div>
  );
}