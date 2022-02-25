import axios from "axios";
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ",
};

export const getCategories = (callback) => async (dispatch) => {
  try {
    const url = `https://staging-api.astrotak.com/api/question/category/all`;
    const response = await axios.get(url, { headers });
    dispatch({ type: "CATEGORY", payload: response.data.data });
    callback(response.data.data);
  } catch (error) {
    dispatch(clearRepos());
  }
};
export const listOfFriendsFamily = (callback) => async (dispatch) => {
  try {
    const url = `https://staging-api.astrotak.com/api/relative/all`;
    const response = await axios.get(url, { headers });
    dispatch({
      type: "FRIENDFAMILYLIST",
      payload: response.data.data.allRelatives,
    });
  } catch (error) {}
};

export const listOfCites = async (keyWord, callback) => {
  try {
    const url = `https://staging-api.astrotak.com/api/location/place?inputPlace=${keyWord}`;
    const response = await axios.get(url, { headers });
    callback(response.data.data);
  } catch (error) {}
};

export const addRelative = async (data, callback, errorCallback) => {
  try {
    const url = `https://staging-api.astrotak.com/api/relative`;
    const response = await axios.post(url, data, { headers });
    callback();
  } catch (error) {
    errorCallback(error.response.data.message);
  }
};
export const updateRelative = async (data, callback, errorCallback) => {
  try {
    const url = `https://staging-api.astrotak.com/api/relative/update/${data.uuid}`;
    const response = await axios.post(url, data, { headers });
    callback();
  } catch (error) {
    errorCallback(error.response.data.message);
  }
};
export const deleteRelative = async (uuid, callback) => {
  try {
    const url = `https://staging-api.astrotak.com/api/relative/delete/${uuid}`;
    await axios.post(url, null, { headers });
    callback();
  } catch (error) {
    errorCallback();
  }
};
