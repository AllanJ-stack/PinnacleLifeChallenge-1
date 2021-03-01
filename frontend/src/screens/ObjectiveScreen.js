import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import Axios from "axios";
import { useSelector } from 'react-redux';

export default function ObjectiveScreen() {


const [objectiveDetails, setObjectiveDetails] = useState({})
const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const userId = userInfo.company;

  
  const getObjectiveDetails = async (userId, userInfo) => {
  const {data} = await Axios.get(`/companies/${userId}.json`)
  console.log(data)
  return data;
 
  };

  useEffect(() => {
    console.log("hi");
    getObjectiveDetails(userId).then((objectiveDetails) => {

      console.log(objectiveDetails)
      setObjectiveDetails(objectiveDetails);
      console.log(
        "Here's the productDetails that will be saved into productDetails state:"
      );
     console.log(objectiveDetails)

    });
  }, [userId] );
  
  
  return (

    <div>

      {Object.keys(objectiveDetails).length !== null ? (
      
         <div>
             <h1>{objectiveDetails.name}</h1>
            <h2>{objectiveDetails.objectives}</h2>
            </div>
        
      ) : (
        <LoadingBox></LoadingBox>
      ) }
    </div>
  );
}

