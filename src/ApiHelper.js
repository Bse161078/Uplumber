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
  var data = JSON.stringify(postData);

  var config = {
    method: "post",
    url: "http://54.176.48.215:8080/api/customerprofile",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
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
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
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

export const PostARequest = () => {
  var config = {
    method: "post",
    url: "http://54.176.48.215:8080/api/customerservicerequest",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const CustomerSericeUpdateProblem = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/update/problem/" +
      localStorage.getItem("requestId"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const CustomerSericeUpdateLookingfor = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/update/lookingfor/" +
      localStorage.getItem("requestId"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const CustomerSericeUpdateProperty = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/update/property/" +
      localStorage.getItem("requestId"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const CustomerSericeUpdateDescriptionAndPhoto = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/update/descriptionandphoto/" +
      localStorage.getItem("requestId"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const CustomerSericeUpdateInssurance = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/update/insurance/" +
      localStorage.getItem("requestId"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const CustomerSericeUpdateContactDetails = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/update/contactdetails/" +
      localStorage.getItem("requestId"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const GetAllRequests = () => {
  var config = {
    method: "get",
    url:
      "http://54.176.48.215:8080/api/customerservicerequest/customer/" +
      localStorage.getItem("id"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const GetAllOffers = () => {
  var config = {
    method: "get",
    url: "http://54.176.48.215:8080/api/customeroffer",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const UpdateCustomerProfile = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "put",
    url: "http://54.176.48.215:8080/api/customerprofile/updatecustomer",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const GetAllContacts = () => {
  var config = {
    method: "get",
    url:
      "http://54.176.48.215:8080/api/customercontact/customer/" +
      localStorage.getItem("id"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getAllFavorites = (id) => {
  var config = {
    method: "get",
    url:
      "http://54.176.48.215:8080/api/customercontact/customer/like/" +
      localStorage.getItem("id"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const addContactToFavorite = (id, like) => {
  console.log("This is islike", like);
  var data = JSON.stringify({
    isLike: like,
  });

  var config = {
    method: "put",
    url: "http://54.176.48.215:8080/api/customercontact/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const acceptOffer = (id) => {
  var data = JSON.stringify({
    isAccepted: true,
  });

  var config = {
    method: "put",
    url: "http://54.176.48.215:8080/api/customeroffer/accept/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const needModificationOffer = (id, text) => {
  var data = JSON.stringify({
    modificationText: text,
  });

  var config = {
    method: "put",
    url: "http://54.176.48.215:8080/api/customeroffer/needmodification/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const getProviderReviews = (id) => {
  var config = {
    method: "get",
    url:
      "http://54.176.48.215:8080/api/providerratingandcomment/provider/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};
