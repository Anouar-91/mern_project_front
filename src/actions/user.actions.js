import axios from "axios"
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE =  "UPLOAD_PICTURE";
export const UPDATE_BIO =  "UPDATE_BIO";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, { withCredentials: true })
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data })
        })
        .catch((err) => console.log(err))
    };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data, { withCredentials: true })
        .then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data })
        })
        .catch((err) => console.log(err))
    };
};

export const updateBio = (bio, id) => {
  return (dispatch) => {
    return axios
        ({ 
          method: 'put',
          url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
          data: {bio},
          withCredentials: true })
        .then((res) => {
          dispatch({ type: UPDATE_BIO, payload: res.data })
        })
        .catch((err) => console.log(err))
    };
};