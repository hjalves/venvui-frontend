/* global fetch, URL */
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
import 'whatwg-fetch';

function status(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response));
  }
}

function json(response) {
  if (response.status === 204)
    return null;
  return response.json();
}

class RestClient {
  constructor(baseURL, headers) {
    this.baseURL = baseURL;
    this.headers = headers || {};
  }

  get(path, params) {
    const url = new URL(this.baseURL + path);
    const headers = Object.assign({}, this.headers, {
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    console.log("GET ", path + url.search);
    return fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors"
    }).then(status).then(json);
  }

  post(path, data) {
    const url = this.baseURL + path;
    const headers = Object.assign({}, this.headers, {
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
    console.log("POST ", path, data);
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      mode: "cors"
    }).then(status).then(json);
  }

  put(path, data) {
    const url = this.baseURL + path;
    const headers = Object.assign({}, this.headers, {
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
    console.log("PUT ", path, data);
    return fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
      mode: "cors"
    }).then(status).then(json);
  }

  del(path) {
    const url = this.baseURL + path;
    const headers = Object.assign({}, this.headers, {
      "Accept": "application/json",
    });
    console.log("DELETE ", path);
    return fetch(url, {
      method: "DELETE",
      headers: headers,
      mode: "cors"
    }).then(status).then(json);
  }
}

export default RestClient;
