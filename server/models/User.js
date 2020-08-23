const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');
let salt = 10;

const userSchema = new Schema(
    {
        name: String,
        surname: String,
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email");
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            data: Buffer,
            contentType: String
        },
        isVerified: { type: Boolean, default: false },
        passwordResetToken: String,
        passwordResetExpires: String
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

module.exports = mongoose.model('User', userSchema);
