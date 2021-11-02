const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, minlength: 3, required: true },
    body: { type: String, minlength: 3 },
    topic: { type: Schema.Types.ObjectId, ref: 'topic', required: true },
    comments: [new Schema({ 
        message: { type: String, minlength: 3, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
     }, {
         collection: 'comments',
         timestamps: true,
     })],
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    collection: 'posts',
    timestamps: true,
    toObject: {},
    toJSON: {}
}); 

exports.Post = model("post", postSchema);