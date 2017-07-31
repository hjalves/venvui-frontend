import RestClient from './utils/RestClient'

const api = new RestClient("http://127.0.0.1:8000");
console.log(api);

export default api;
