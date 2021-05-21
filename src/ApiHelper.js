import axios from "axios";

var URL = "http://54.176.48.215:8080/api/";

export const getAllSubjects = () => {
  return axios({
    method: "get",
    url: URL + `show-subjects`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const Signup = (postData) => {
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "post",
    url: URL + "customers/signup",
    headers: {
      headers,
    },
    data: postData,
  };

  return axios(config);
};

export const Login = (postData) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  var config = {
    method: "post",
    url: URL + "customers/login",
    headers: {
      headers,
    },
    data: postData,
  };

  return axios(config);
};

export const CompleteProfile = (postData) => {
  let headers = new Headers();
  console.log("This is token", `Bearer ${localStorage.getItem("token")}`);
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  var config = {
    method: "post",
    url: URL + "customerprofile",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTc0Y2Q0NGYxY2JlNTgzNzZhYmZkYSIsImlhdCI6MTYyMTU5MTgyOSwiZXhwIjoxNjI0MTgzODI5fQ.cr7nlG6VYPu3oCecG7R-7u35BpK65TglSAlQ2Ykdtoc",
      "Content-Type": "application/json",
    },
    data: postData,
  };

  return axios(config);
};

export const CustomerNotifications = () => {
  var config = {
    method: "get",
    url: "http://54.176.48.215:8080/api/customernotification",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const AllProviders = () => {
  var config = {
    method: "get",
    url: "http://54.176.48.215:8080/api/providerprofile",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const MyProfile = () => {
  var config = {
    method: "get",
    url:
      "http://54.176.48.215:8080/api/customerprofile/" +
      localStorage.getItem("id"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};
