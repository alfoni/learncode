export default function getUser(req, res) {
  const id = req.cookies.kodeboksen;

  res.send({
    id: id,
    isAdmin: id === 'christianalfoni@gmail.com',
    completedAssignments: {}
  });
}
