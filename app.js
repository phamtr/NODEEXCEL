// import module in application
let express = require('express');
let morgan = require('morgan');
let mongoose = require('mongoose');
let path = require('path');

// connect mongodb with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/excel_example', {useMongoClient: true});
require('./model/init'); // init data
let app = express(); // khoi tao ung dung

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); // hien thi log cung morgan
app.use('/', require('./router'));  // nap router vao he thong


// run ung dung trn cong 82
app.listen(82, '0.0.0.0', () => {
  console.log(`App running port 82`);
});
