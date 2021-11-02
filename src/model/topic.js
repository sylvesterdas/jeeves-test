const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
    name: { type: String, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    collection: 'topics',
    timestamps: true,
    toObject: {},
    toJSON: {}
});

exports.Topic = model("topic", topicSchema);