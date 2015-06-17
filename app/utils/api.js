import request from 'superagent';

export default {

  post(url, data) {

    return new Promise(function (resolve, reject) {
      request
        .post(url)
        .send(data)
        .set('Content-Type', 'application/json')
        .end(function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result.text ? JSON.parse(result.text) : null);
        })
    });
    
  }
};