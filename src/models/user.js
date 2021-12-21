const connection = require('../config/db');

// module.exports = {
//   find: () => {
//     return new Promise((resolve, reject) => {
//       connection.query('SELECT COUNT(*) AS total FROM products', (error, result) => {
//         if (!error) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });
//     });
//   }
// };

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// module.exports = {
//   find
// };
