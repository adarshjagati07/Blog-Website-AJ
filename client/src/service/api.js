import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";

const API_URL = `http://localhost:8000`;

const axiosInstance = axios.create({
   baseURL: API_URL,
   timeout: 10000,
   headers: {
      "Content-Type": "application/x-www-form-urlencoded",
   },
});

axiosInstance.interceptors.request.use(
   function (config) {
      if (config.TYPE.params) {
         config.params = config.TYPE.params;
      } else if (config.TYPE.query) {
         config.url = config.url + "/" + config.TYPE.query;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   function (response) {
      //stop global loader here
      return processResponse(response);
   },
   function (error) {
      //stop global loader here
      return processError(error);
   }
);

//******************************* */
//if success turns out to be true then return {isSuccess : true, data:Object}
//if failure is there  then return {isFailure : true, status: string, msg: string, code : int}
//******************************* */
const processResponse = (response) => {
   if (response?.status === 200) {
      return { isSuccess: true, data: response.data };
   } else {
      return {
         isFailure: true,
         status: response?.status,
         msg: response?.msg,
         code: response?.code,
      };
   }
};
const processError = (error) => {
   if (error.response) {
      //request successfully made and server responded with status other then 200
      //that falls out of the range 2.x.x
      console.log(`Error in response: `, error.toJSON());
      return {
         isError: true,
         msg: API_NOTIFICATION_MESSAGES.responseFailure,
         code: error.response.status,
      };
   } else if (error.request) {
      //request made but no response received
      console.log(`Error in request: `, error.toJSON());
      return {
         isError: true,
         msg: API_NOTIFICATION_MESSAGES.requestFailure,
         code: "",
      };
   } else {
      //something happened on frontend side
      console.log(`Error in Network: `, error.toJSON());
      return {
         isError: true,
         msg: API_NOTIFICATION_MESSAGES.networkError,
         code: "",
      };
   }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
   API[key] = (body, showUploadProgress, showDownloadProgress) => {
      return axiosInstance({
         method: value.method,
         url: value.url,
         data: body,
         responseType: value.responseType,
         headers: {
            authorization: getAccessToken(),
         },
         TYPE: getType(value, body),
         onUploadProgress: function (progressEvent) {
            if (showUploadProgress) {
               let percentageCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
               );
               showUploadProgress(percentageCompleted);
            }
         },
         onDownloadProgress: function (progressEvent) {
            if (showDownloadProgress) {
               let percentageCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
               );
               showDownloadProgress(percentageCompleted);
            }
         },
      });
   };
}

export { API };
