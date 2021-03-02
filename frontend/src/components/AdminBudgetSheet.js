import React from "react";

export default function yearBudgetDetails(props) {
  const { yearBudgetDetails } = props;
  console.log(yearBudgetDetails)

    return (
        <div key={Math.random} className="card">
          <div>This year: {yearBudgetDetails.year}</div>
          <div>User ID: {yearBudgetDetails.userId}</div>
          <div>Salary: {yearBudgetDetails.salary}</div>
          <div>Total Commission: {yearBudgetDetails.total_commission}</div>
          <div>Total Expense: {yearBudgetDetails.total_expense}</div>
          <div>Net Worth: {yearBudgetDetails.nett_worth}</div>
        </div>
      );



}