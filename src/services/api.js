import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '5879e3f1372f127febbcff25791a647c',
  },
});

export default api;
