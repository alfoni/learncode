export default function getUser(req, res) {
  const id = req.cookies.kodeboksen;
  console.log('userId', id);

  res.send({
    id: id,
    isAdmin: id === 'christianalfoni@gmail.com',
    completedAssignments: {}
  });
}
