export default function getUser(req, res) {
  setTimeout(() => {
    res.type('json');
    res.status(500);
    res.send({});
    
    return;
  }, 1000);
}
