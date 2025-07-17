import axios from "axios"

export const setHeader = (key:string, payload:string) =>{
    axios.defaults.headers.common[key] = payload;
}

export const deleteHeader = (key:string) => {
    delete axios.defaults.headers.common[key];
}