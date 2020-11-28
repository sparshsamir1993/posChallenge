export default function (state = false, action) {
  switch (action.type) {
    case "SET_BADGE":
      return action.payload || false;
    default:
      return state;
  }
}
