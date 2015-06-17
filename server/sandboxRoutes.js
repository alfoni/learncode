module.exports = function (router) {

  router.get('/', function (req, res) {
    res.type('html');
    res.send(global.sandbox);
  });

};