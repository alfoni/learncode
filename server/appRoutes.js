var updateSandbox = require('./sandbox/updateSandbox');

module.exports = function (router) {
  
  router.post('/sandbox', function (req, res) {
    updateSandbox(req.body.code);
    res.type('json');
    res.end();
  });

};