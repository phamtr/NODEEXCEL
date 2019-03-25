let User = require('./user.model');

User.remove({}).exec(); // remove tat cac cac du lieu co trong collection User

let userOne = new User({
  userName: 'NguyenManh',
  email: 'nguyenmanhit.mak@gmail.com',
  phone: '0978089594'
});

let userTwo = new User({
  userName: 'MrFamily',
  email: 'myfamily@gmail.com',
  phone: '0978089596'
});

let userThree = new User({
  userName: 'goodBad',
  email: 'boodbad@gmail.com',
  phone: '0971089596'
});

let userFour = new User({
  userName: 'hello',
  email: 'hello@gmail.com',
  phone: '0978089514'
});

// insert 4 user vao collection User
[userOne, userTwo, userThree, userFour].forEach(userItem => {
  userItem.save();
});