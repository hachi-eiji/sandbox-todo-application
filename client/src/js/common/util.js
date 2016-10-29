import 'whatwg-fetch';
import Promise from 'promise/lib/es6-extensions';
import Config from '../config';

function binds(obj, ...methods) {
  methods.forEach((method) => {
    obj[method] = obj[method].bind(obj);
  });
}

/**
 * post data.
 *
 * @param {string} endPoint API end point
 * @param {Object} [data] post data
 * @return {Promise} Promise object
 */
function postJSON(endPoint, data) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = data ? JSON.stringify(data) : '';
    fetch(Config.api.url + endPoint, {
      model: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: body
    }).then(res => {
      // 300番台は想定しない
      if (res.ok) {
        return res.json();
      }
      // JSONなげて終わる
      return res.json().then(d => {
        const e = new Error(res.body ? res.body.message : res.statusText);
        e.status = res.status;
        e.body = d;
        e.response = res;
        throw e;
      });
    }).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

module.exports = {
  binds: binds,
  postJSON: postJSON,
};
