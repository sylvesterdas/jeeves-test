const { Schema, model } = require("mongoose");
const { compare } = require('bcryptjs');

const userSchema = new Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
}, {
    collection: 'users',
    timestamps: true,
    toObject: {},
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
}); 

userSchema.methods = {
    checkPassowrd(password) {
        return compare(password, this.password);
    }
};

exports.User = model("user", userSchema);