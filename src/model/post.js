const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, minlength: 3 },
    images: [{ type: String, minlength: 3 }],
    body: { type: String, minlength: 3 },
    createdBy: { type: Schema.Types.ObjectId },
}, {
    collection: 'posts',
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            delete ret._id;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
        }
    }
}); 

exports.Post = model("post", postSchema);