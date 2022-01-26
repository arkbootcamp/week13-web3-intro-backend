const nodemailer = require('nodemailer');

const handleNotFount = (req, res, next) => {
  res.status(404);
  res.json({
    message: 'url not found'
  });
};
const response = (res, result, status, message, pagination) => {
  // const resultPrint = {}
  // resultPrint.status = 'success'
  // resultPrint.statusCode = status
  // resultPrint.data = result
  // resultPrint.error = error || null
  // res.status(status).json(resultPrint)

  res.status(status).json({
    status: 'Success',
    code: status || 200,
    data: result,
    message: message || null,
    pagination: pagination
  });
};

const sendEmail = async (toEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'fullstackwebarka@gmail.com', // generated ethereal user
      pass: 'Arkademy12345#' // generated ethereal password
    }
  });
  const info = await transporter.sendMail({
    from: '"Admin Tokoku 👻" <fullstackwebarka@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: 'selamat data di aplikasi tokoku', // Subject line
    // text: 'Hello world?', // plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        .wrapper{
            width: 230px;
            height: 120px;
            background-color: blue;
            margin: 0 auto;
        }
    </style>
    <body>
        <div class="wrapper">
            <h1>Selamat datang di aplikasi toko ku</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum ullam recusandae deserunt enim natus illo impedit neque excepturi deleniti in.</p>
            <h3>silahkan lakukan verifikasi</h3>
            <a style="color: red;" href="http://localhost:5000/users/verifikasi-main/sdfasdkfsakldfjskdfjn2ensdf">tekan verifikasi</a>
        </div>
    </body>
    </html>` // html body
  });
  console.log(info);
};
module.exports = {
  handleNotFount,
  response,
  sendEmail
};
