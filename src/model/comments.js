const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    message: { type: String, minlength: 3, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    collection: 'comments',
    timestamps: true,
    toObject: {},
    toJSON: {}
});

exports.Comment = model("comment", commentSchema);