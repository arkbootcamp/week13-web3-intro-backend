const myConsole = (req, res, next) => {
  console.log('my middleware di jalankan');
  next();
};

module.exports = {
  myConsole: myConsole
};
