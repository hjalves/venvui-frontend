/* global fetch, URL */
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
import 'whatwg-fetch';
import ndjsonStream from 'can-ndjson-stream';

function status(response) {
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

function log(response) {
  console.log(response);
  return response;
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
    }).then(status).then(json).then(log);
  }

  getStream(path, params) {
    const url = new URL(this.baseURL + path);
    const headers = Object.assign({}, this.headers, {
      "Accept": "text/plain",
      "Content-Type": "text/plain"
    });
    if (params)
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    console.log("GET ", path + url.search);
    return fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors"
    }).then(status).then(response => ndjsonStream(response.body));
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
    }).then(status).then(json).then(log);
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
    }).then(status).then(json).then(log);
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
    }).then(status).then(json).then(log);
  }
}

export default RestClient;
