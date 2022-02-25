const initialState = {
  list: [],
};

const friendsFamily = (state = initialState, action) => {
  switch (action.type) {
    case "FRIENDFAMILYLIST":
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};
export default friendsFamily;
