var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoDB = 'mongodb://127.0.0.1:27017/user_test';
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

var user = new Schema( { username: String, password: String });
var User = mongoose.model('user', user);

var foo = new User({
    username: "aaa",
    password: "xyz"
});

foo.save(function(err) {
    if (err) throw err;
});

var rtn = User.find({ username: "bbb"});
console.log(rtn);

const res = User.updateOne( {name: "aaa"}, { name: "abc"},
    function(err) {
        if (err) throw err;
    }
);
console.log(res);

User.find({ username: "abc"});
