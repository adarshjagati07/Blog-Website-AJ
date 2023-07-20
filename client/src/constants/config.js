// API notification messages
export const API_NOTIFICATION_MESSAGES = {
   loading: {
      title: "Loading...",
      message: "Data is being loaded, Please wait",
   },
   success: {
      title: "Success",
      message: "Data successfully loaded",
   },
   responseFailure: {
      title: "Error",
      message: "Error occured while fetching response from the server. Please try again.",
   },
   requestFailure: {
      title: "Error",
      message: "Error occured while parsing a request data",
   },
   networkError: {
      title: "Error",
      message:
         "Unable to connect with the server. Please check internet connectivity and try again later",
   },
};

//API Service Call
export const SERVICE_URL = {
   userSignup: { url: `/signup`, method: `POST` },
   userLogin: { url: `/login`, method: `POST` },
   uploadFile: { url: `/file/upload`, method: `POST` },
   createPost: { url: `/create`, method: `POST` },
};
