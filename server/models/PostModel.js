import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        postOwner: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "owner required"],
            ref: "User",
        },
        placeName: {
            type: String,
            required: [true, "placeName required"]
        },
        title: {
            type: String,
            required: [true, "title required"]
        },
        content: {
            type: String,
            required: [true, "content required"],
        },
        tags: {
            type: Array,
        },
        image: {
            type: String,
        },
        likes: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            default: [],
        },
        comments: {
            type: [
                {
                    content: String,
                    commentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                },
            ],
            default: [],
        },
        rating: {
            type: Number,
            max: 10,
            min: 1,
            required: [true, "rating required"]
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Post", postSchema);
