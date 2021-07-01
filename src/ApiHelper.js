import axios from "axios";

var URL = "https://u-plumber.net/api/";

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

export const resetPassword = (postData) => {
  console.log("This is great", postData);
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customers/resetpassword",
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
    url: "https://u-plumber.net/api/customerprofile",
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
    url: "https://u-plumber.net/api/customernotification",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const AllProviders = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/providerprofile",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`,
    // },
  };

  return axios(config);
};

export const AllProvidersByLocation = (lat, long, distance) => {
  var config = {
    method: "get",
    url:
      "https://u-plumber.net/api/customerprofile/allproviders/" +
      lat +
      "/" +
      long +
      "/" +
      distance,
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
      "https://u-plumber.net/api/customerprofile/" + localStorage.getItem("id"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const PostARequest = () => {
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customerservicerequest",
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
      "https://u-plumber.net/api/customerservicerequest/update/problem/" +
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
      "https://u-plumber.net/api/customerservicerequest/update/lookingfor/" +
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
      "https://u-plumber.net/api/customerservicerequest/update/property/" +
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
      "https://u-plumber.net/api/customerservicerequest/update/descriptionandphoto/" +
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
      "https://u-plumber.net/api/customerservicerequest/update/insurance/" +
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
      "https://u-plumber.net/api/customerservicerequest/update/contactdetails/" +
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
      "https://u-plumber.net/api/customerservicerequest/customer/" +
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
    url:
      "https://u-plumber.net/api/customeroffer/customer/" +
      localStorage.getItem("id"),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const GetAllInssuraceCompanies = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/insurances",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getPrefferedTimings = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/prefferedtiming",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getRequestorStatus = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/requesterstatus",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getHomeStructures = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/structures",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getLookingFor = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/lookingfor",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getAreas = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/areas",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios(config);
};

export const getItems = () => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/services",
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
    url: "https://u-plumber.net/api/customerprofile/updatecustomer",
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
      "https://u-plumber.net/api/customercontact/customer/" +
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
      "https://u-plumber.net/api/customercontact/customer/like/" +
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
    url: "https://u-plumber.net/api/customercontact/" + id,
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
    status: "OfferAccepted",
  });

  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customeroffer/accept/" + id,
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
    isNeedModification: true,
    modificationText: text,
    status: "NeedModification",
  });

  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customeroffer/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const markOrderComplete = (id) => {
  var data = JSON.stringify({
    isOrderCompleted: true,
    status: "Completed",
  });

  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customeroffer/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const verifyPhone = () => {
  var data = JSON.stringify({
    isPhoneNumberVerify: true,
  });

  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customerprofile/updatecustomer",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const changePassword = (newPassword) => {
  var data = JSON.stringify({
    password: newPassword,
    email: localStorage.getItem("email"),
  });

  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customers/resetpassword",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const enableNotification = (data) => {
  console.log("This is the notification data", data);
  var data = JSON.stringify(data);

  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customerprofile/updateenablenotification",
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
    url: "https://u-plumber.net/api/providerratingandcomment/provider/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  return axios(config);
};

export const setProviderReviews = (customerId, id, rating, comment) => {
  var data = JSON.stringify({
    providerId: id,
    customerId: customerId,
    rating: rating,
    comment: comment,
  });
  console.log("This is dataa", data);
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/providerratingandcomment",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const cancelAllOffers = (id) => {
  var data = JSON.stringify({
    serviceId: id,
  });
  console.log("This is dataa", data);
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customeroffer/cancellofers",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const cancelTheRequest = (id) => {
  var data = JSON.stringify({
    serviceId: id,
  });
  console.log("This is dataa", data);
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customerservicerequest/cancelrequest/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    // data: data,/
  };

  return axios(config);
};

export const uploadImage = (image) => {
  let formData = new FormData();

  formData.append("image", image);
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/upload",
    headers: {
      headers,
    },
    data: formData,
  };

  return axios(config);
};

export const sendCustomerNotification = (id, notificationText, serviceId) => {
  var data = JSON.stringify({
    customerId: localStorage.getItem("id"),
    providerId: id,
    notificationText: notificationText,
    serviceId: serviceId,
  });
  console.log("This is dataa", data);
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customernotification",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const checkUser = (email, phone) => {
  var data = JSON.stringify({
    email: email,
    phoneNumber: phone,
  });
  console.log("This is dataa", data);
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customerprofile/checkuser",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};
