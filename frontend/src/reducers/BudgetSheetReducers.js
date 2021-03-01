const {
    BUDGETSHEET_REQUEST,
    BUDGETSHEET_SUCCESS,
    BUDGETSHEET_FAIL,

  } = require('../constants/BudgetSheetConstants');
  
  export const budgetSheetReducer = (
    state = { budgetDetails: {}, loading: true}, //empty object
    action
  ) => {
    switch (action.type) {
      case BUDGETSHEET_REQUEST:
        return { loading: true };
      case BUDGETSHEET_SUCCESS:
        return { loading: false, budgetDetails: action.payload };
      case BUDGETSHEET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };