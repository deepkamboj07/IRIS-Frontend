
import { notification } from "antd";
import { deleteHeader } from "./header";
import axios, { type AxiosResponse, type ResponseType } from "axios";
const testMode = import.meta.env.VITE_NEXT_TEST_MODE;


const SERVICE_URL = "https://iris-backend-m9i0.onrender.com"; 


const logout = ()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("persist:root");
  deleteHeader("auth");
  window.location.reload();
}


interface ApiResponse {
    message?: string;
    success: boolean;
    data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    error?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    status?: number;
}


if(testMode === "true"){
  notification.info({
    message: "Testing Mode !!",
    description: "Test mode Active !!",
    placement: "bottomRight",
    duration: 10,
    style: {
      backgroundColor: "#f6ffed",
      border: "1px solid #b7eb8f",
    },
  });
}


//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const servicePost = async (path:string, payload:object, headers:any = null) : Promise<ApiResponse> => {

  //console.log(path.split("/").shift())
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${SERVICE_URL}${path}`,
        payload,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        if(typeof response.data === "string"){
          resolve(JSON.parse(response.data));
        }
        else{
          resolve(response.data);
        }
      })
      .catch(function (error) {
        reject(error);
        //check is error status is 401 and redirect to login
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};



//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serviceGet = async (path:string, headers:any = null): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
  
    axios
      .get(
        `${SERVICE_URL}${path}`,
        {
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
        }
      )
      .then(function (response) {
        //parse if response is string
        if(typeof response.data === "string"){
          resolve(JSON.parse(response.data));
        }
        else{
          resolve(response.data);
        }
      })
      .catch(function (error) {
        reject(error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const servicePut = async (path:string, payload:object, headers:any = null): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${SERVICE_URL}${path}`,
        payload,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        if(typeof response.data === "string"){
          resolve(JSON.parse(response.data));
        }
        else{
          resolve(response.data);
        }
      })
      .catch(function (error) {
        reject(error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const servicePatch = async (path:string, payload:object, headers:any = null): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${SERVICE_URL}${path}`,
        payload,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        if(typeof response.data === "string"){
          resolve(JSON.parse(response.data));
        }
        else{
          resolve(response.data);
        }
      })
      .catch(function (error) {
        reject(error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serviceDelete = async (path:string, headers:any = null): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(
       `${SERVICE_URL}${path}`,
        {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            ...axios.defaults.headers.common,
          },
        }
      )
      .then(function (response) {
        if(typeof response.data === "string"){
          resolve(JSON.parse(response.data));
        }
        else{
          resolve(response.data);
        }
      })
      .catch(function (error) {
        reject(error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};

export const serviceGetWithCustomResponse = async (
  path:string,
  responseType:ResponseType="blob"
):Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${SERVICE_URL}${path}`,
        {
          responseType: responseType,
        }
      )
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {
        reject(error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};



export const servicePostWithCustomResponse = async (
  path:string,
  payload:object,
  responseType:ResponseType="blob"
):Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${SERVICE_URL}${path}`,
        payload,
        {
          responseType: responseType,
        }
      )
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {
        reject(error);
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "Session Expired",
            description: "Please login to continue",
          });
          logout();
        }
      });
  });
};