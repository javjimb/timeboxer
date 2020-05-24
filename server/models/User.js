const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
let salt = 10;

const userSchema = new Schema(
    {
        name: String,
        surname: String,
        email: {
            type: String,
            required: true,
            unique: 1,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    }
);

// Hash the password before saving
userSchema.pre('save', function(next){
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(salt, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash){
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
