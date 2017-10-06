/* global fetch, URL */
// https://developers.google.com/web/updates/2015/03/introduction-to-fetch
import 'whatwg-fetch';
import ndjsonStream from 'can-ndjson-stream';
import URLSearchParams from 'url-search-params'

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

function appendSearchParams(url, params) {
  if (params) {
    let urlSearch = new URLSearchParams();
    Object.keys(params).forEach(key => urlSearch.append(key, params[key]));
    if (urlSearch.toString())
      url += '?' + urlSearch.toString();
  }
  return url
}

class RestClient {
  constructor(baseURL, headers) {
    this.baseURL = baseURL;
    this.headers = headers || {};
  }

  get(path, params) {
    path = appendSearchParams(path, params);
    const url = this.baseURL + path;
    const headers = Object.assign({}, this.headers, {
      "Accept": "application/json"
    });
    console.log("GET ", path);
    return fetch(url, {
      method: "GET",
      headers: headers,
      mode: "cors"
    }).then(status).then(json).then(log);
  }

  getStream(path, params) {
    path = appendSearchParams(path, params);
    let url = this.baseURL + path;
    const headers = Object.assign({}, this.headers, {
      "Accept": "text/plain, application/x-ndjson"
    });
    console.log("GET ", path);
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

  postFile(path, data) {
    const url = this.baseURL + path;
    const headers = Object.assign({}, this.headers, {
      "Accept": "application/json"
    });
    console.log("POST ", path, data);
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
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
