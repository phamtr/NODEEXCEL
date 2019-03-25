let express = require('express');
let router = express.Router();
let nodeXlsx = require('node-xlsx');
let User = require('./model/user.model');
let fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/export-download', function (req, res) {
  let dataExcel = [];
  User.find({})
    .then(users => {
      // Lay du lieu header cho file excel <=> lay cac key name trong collection
      // O day cac key name cua collection user la: userName, email, phone
      let arrHeaderTitle = [];
      Object.keys(users[0]['_doc']).forEach(key => {
        arrHeaderTitle.push(key);
      });
      dataExcel.push(arrHeaderTitle);  // push header vao mang dataExcel

      // Lay du lieu cac row tuong ung voi header <=> lay cac value tuong ung voi key name o tren
      for (let item of users) {
        let rowItemValue = [];
        Object.keys(item._doc).forEach(key => {
          rowItemValue.push(item[key]);
        });
        dataExcel.push(rowItemValue); // push tung dong value vao mang dataExcel
      }
      let buffer = nodeXlsx.build([{name: "List User", data: dataExcel}]); // Returns a buffer
      res.attachment('users.xlsx');
      res.send(buffer);
    })
    .catch(err => res.status(400).json(err));
});

router.get('/create-link', function (req, res) {
  let domain = "http://localhost:82";
  let dataExcel = [];
  User.find({})
    .then(users => {
      let demo2 = [];
      Object.keys(users[0]['_doc']).forEach(key => {
        "use strict";
        demo2.push(key);
      });
      dataExcel.push(demo2);
      for (let item of users) {
        let demo3 = [];
        Object.keys(item._doc).forEach(key => {
          demo3.push(item[key]);
        });
        dataExcel.push(demo3);
      }
      let buffer = nodeXlsx.build([{name: "List User", data: dataExcel}]);

      // Thay vì res.attachment('user.xlsx') mình sẽ ghi ra file users.xlsx theo đường dẫn public/exports
      // Sau đó mình tạo 1 liên kết trỏ tới file đó và gửi nó sang trang receive đính kèm theo link
      fs.writeFile('public/exports/users.xlsx', buffer, function (err) {
        if (err) return console.log(err);
        else return res.render('receive', {link: `${domain}/exports/users.xlsx`});
      });
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
