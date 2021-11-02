const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
    name: { type: String, unique: true },
    createdBy: { type: Schema.Types.ObjectId },
}, {
    collection: 'topics',
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

exports.Topic = model("topic", topicSchema);