import axios from 'axios'
// import { api } from '../urlConfig'


//   const token=localStorage.getItem('token')
const axiosInstance=axios.create({
    // baseURL:api,
    // headers:{
    //   'Authorization':token?`bearer ${token}` :""
    // },
    validateStatus: function (status) {
      return status >= 200 && status < 520; // default
    }
})

// axiosInstance.interceptors.request.use((req) => {
//   const { auth } = store.getState();
//   if (auth.token) {
//     req.headers.Authorization = `Bearer ${auth.token}`;
//   }
//   return req;
// });

export default axiosInstance