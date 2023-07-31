const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload
    default:
      return state
  }
}

export const applyFilter = substring => {
  return {
    type: "FILTER",
    payload: substring
  }
}

export default filterReducer