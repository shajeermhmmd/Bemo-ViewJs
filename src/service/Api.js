import axios from 'axios';

export default () => {
  
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const FileUp = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})
