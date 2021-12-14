
let data = [
  // res.send("helo world 4")
  {
    id: 1,
    username: 'risano',
    emai: 'rsiano@gmail.com'
  },
  {
    id: 2,
    username: 'budi',
    emai: 'budi@gmail.com'
  }
]

const insertUser = (req, res, next) => {
  // const username = req.body.username
  // const email = req.body.email
  // const id = req.body.id
  const { id, username, email } = req.body
  const tampung = {
    id: id,
    username: username,
    email: email
  }
  data.push(tampung)
  console.log(req.body);
  res.json({
    message: 'data berhasil di tambahkan'
  })
}

const deleteUser = (req, res, next) => {
  const idUser = req.params.id
  console.log(idUser);
  data = data.filter((user) => {
    return user.id != idUser
  })
  res.json({
    message: 'data berhasil dihapus'
  })
}
const getUser = (req, res, next) => {
  res.json({
    result: data
  })
}

module.exports = {
  insertUser: insertUser,
  deleteUser: deleteUser,
  getUser: getUser
}