import axios from "axios";
let BASE_URL = "http://localhost:5050/api";
export const loginUser = (data) => async (dispatch) => {
  let resp = await axios.post(BASE_URL + "/login", data, {
    withCredentials: true,
  });
  console.log(resp);
  dispatch({ type: "FETCH_USER", payload: resp.data });
  console.log(resp.data);
  window.location.reload();
};

export const registerUser = (data) => async (dispatch) => {
  let resp = await axios.post(BASE_URL + "/register", data);
  dispatch({ type: "FETCH_USER", payload: resp.data });
  console.log(resp.data);
  window.location.reload();
};

export const setCreditLimit = (data, userId) => async (dispatch) => {
  console.log(data);
  let resp = await axios.patch(BASE_URL + "/setCreditLimit", {
    limit: data,
    id: userId,
  });
  dispatch({ type: "FETCH_USER", payload: resp.data });
  window.location.reload();
};

export const getCurrentUser = (data) => async (dispatch) => {
  console.log(data);
  let resp = await axios.get(BASE_URL + "/currentUser", {
    withCredentials: true,
  });
  dispatch({ type: "FETCH_USER", payload: resp.data });
};

export const logUserOut = () => async (dispatch) => {
  let resp = await axios.post(
    BASE_URL + "/logout",
    {},
    { withCredentials: true }
  );
  dispatch({ type: "FETCH_USER", payload: {} });
  window.location.reload();
};

export const setBadge = (value) => (dispatch) => {
  dispatch({ type: "SET_BADGE", payload: value });
};
