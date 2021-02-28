const {
    BUDGETSHEET_REQUEST,
    BUDGETSHEET__SUCCESS,
    BUDGETSHEET__FAIL,

  } = require('../constants/BudgetSheetConstants');
  
  export const budgetSheetReducer = (
    state = { loading: true, budgetDetails: [] }, //budget set empty array
    action
  ) => {
    switch (action.type) {
      case BUDGETSHEET_REQUEST:
        return { loading: true };
      case BUDGETSHEET__SUCCESS:
        return { loading: false, budgetDetails: action.payload };
      case BUDGETSHEET__FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };