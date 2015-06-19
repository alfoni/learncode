import request from 'superagent';

let getCourse = function (cerebral) {
  return new Promise(function (resolve) {

    request('/course')
      .end(function (err, res) {
        
        resolve(JSON.parse(res.text));

      });

  });
};

export default getCourse;