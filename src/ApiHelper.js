import axios from "axios";
import Avatar from "./assets/avatar.png";

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

export const AddLeadPrice = (postData) => {
  return axios({
    method: "put",
    url: URL + `customerservicerequest/admin/leadprice/update`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: postData
  });
 
};
export const deleteProfileApi = () => {
  return axios({
    method: "delete",

    url: URL + `customerprofile/deletecustomer`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {id:JSON.parse(localStorage.getItem("userData"))._id}
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

export const sendForgotLink = (postData) => {
  console.log("This is great", postData);
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customers/sendresetpasswordemail",
    headers: {
      headers,
    },
    data: postData,
  };

  return axios(config);
};

export const updateCustomerEmailStatus = (postData) => {
  console.log("This is great", postData);
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customerprofile/updatecustomeremailstatus",
    headers: {
      headers,
    },
    data: postData,
  };

  return axios(config);
};

export const customerResetPassword = (id, newPassword) => {
  console.log("This is great customer", id, newPassword);
  const postData = {
    resetPassword: newPassword,
  };
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "post",
    url:  "https://u-plumber.net/api/customers/forgotpassword/" + id,
    headers: {
      headers,
    },
    data: postData,
  };

  return axios(config);
};

export const providerResetPassword = (id, newPassword) => {
  console.log("This is great provider", id, newPassword);
  const postData = {
    resetPassword: newPassword,
  };
  let headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/providers/forgotpassword/" + id,
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

export const DeleteCustomerProfile = (postData) => {
  console.log("postdata",postData)
  return axios({
    method: "put",
    url: URL + `customerprofile/updatecustomer/deletestatus`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
   
    data: postData
    
  });
};


export const CompleteProfile = (postData) => {
  var data = JSON.stringify(postData);
  var token  = "";
  if(localStorage.getItem("tokenTemp"))
  {
    token = localStorage.getItem("tokenTemp")
  }
  else if(localStorage.getItem("token"))
  {
    token =  localStorage.getItem("token")
  }

  var config = {
    method: "post",
    url: URL +"customerprofile",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const CustomerNotifications = () => {
  var config = {
    method: "get",
    url:
      "https://u-plumber.net/api/customernotification/customer/" +
      localStorage.getItem("id"),
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
      30,
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

export const CustomerSericeAutoAccept = (autoAccept) => {
  var postData = {
    autoAccept: autoAccept,
  };
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
    url: "https://u-plumber.net/api/properties",
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

export const getDistanceFromCordintates = (cordinates) => {
  var config = {
    method: "get",
    url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592&key=AIzaSyAY-S1OMvpOMhUrXgmtAiJ-jDTAX0jJzSU",
    headers: {
      "Access-Control-Allow-Origin": "*",
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

export const createContact = (postData) => {
  var data = JSON.stringify(postData);

  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customercontact",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};
console.log("This is my id", localStorage.getItem("id"));
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
    plumberProfileId: id,
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

export const removeFavorite = (id, like) => {
  console.log("This is islike", like);
  var data = JSON.stringify({
    plumberProfileId: id,
  });
  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customerprofile/removefavouritplumber",
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

export const getOfferDetail = (id) => {
  var config = {
    method: "get",
    url: "https://u-plumber.net/api/customeroffer/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
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
    status: "OrderCompleted",
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

export const markOrderCancelled = (id) => {
  var data = JSON.stringify({
    isOrderCancelled: true,
    status: "OrderCancelled",
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

console.log("Token", localStorage.getItem("token"));
export const acceptNewCompletionDate = (id, newEstimatedCompletionDate) => {
  var data = JSON.stringify({
    estimatedCompletionDate: newEstimatedCompletionDate,
    newEstimatedCompletionDate: "",
  });

  console.log("This is data", data, id);
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
export const verifyEmail = (email,isemailVerify) => {
  var data = JSON.stringify({
    isPhoneNumberVerify: true,
  });

  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customers/verifyemail",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const sendEmailVerification = (email) => {
  

  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customers/sendmailerifivationode",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: email,
  };

  return axios(config);
};
export const emailVerification = (email,code) => {
  

  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customers/verifyemail",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: email,code
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

export const setProviderReviews = (
  customerId,
  id,
  rating,
  comment,
  serviceId
) => {
  var data = JSON.stringify({
    providerId: id,
    customerId: customerId,
    rating: rating,
    comment: comment,
    serviceId: serviceId,
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

export const hideAllOffers = (id) => {
  var data = JSON.stringify({
    serviceId: id,
  });
  console.log("This is dataa", data);
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/customeroffer/hideoffers",
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

export const sendCustomerNotification = (
  id,
  notificationText,
  serviceId,
  offerId,
  type
) => {
  var data = JSON.stringify({
    customerId: localStorage.getItem("id"),
    providerId: id,
    notificationText: notificationText,
    serviceId: serviceId._id,
    offerId: offerId,
    image: JSON.parse(localStorage.getItem("userData")).profileImage || Avatar,
    type: type,
    isProviderReview: false,
    latitude: null,
    longitude: null,
    isView: false,
    locationName: "",
  });
  console.log("This is dataa", JSON.parse(data));
  var config = {
    method: "post",
    url: "https://u-plumber.net/api/providernotification",
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
    email: email.toLowerCase(),
    // phoneNumber: phone,
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

export const viewNotification = (id) => {
  var data = JSON.stringify({
    isView: true,
    // phoneNumber: phone,
  });
  console.log("This is dataa", data);
  var config = {
    method: "put",
    url: "https://u-plumber.net/api/customernotification/" + id,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};


export const uploadFile= (data)=>{
  return  axios.post("https://u-plumber.net/api/upload", data, {
      headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data`,
      }
  })
}


export const UpdateEmailVerificationStatus = (postData) => {
    var data = JSON.stringify(postData);

    var config = {
        method: "put",
        url:
            "https://u-plumber.net/api/customerprofile/updatecustomeremailstatus/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        data: data,
    };

    return axios(config);
};