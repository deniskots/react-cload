const {Schema, model} = require('mongoose');

//инфориация о полях сущностей и айди создается автоматически
const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    /*files: [{type: ObjectId, ref: 'File'}],*/
})

module.exports = model('User', User)