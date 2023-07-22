import Comment from "../model/comment.js";
export const newComment = async (request, response) => {
	try {
		const comment = await new Comment(request.body);
		comment.save();
		response.status(200).json({ msg: "Comment Saved successfully" });
	} catch (error) {
		response.status(500).json({ msg: error.message });
	}
};

export const getComments = async (request, response) => {
	try {
		let comments = await Comment.find({ postId: request.params.id });
		response.status(200).json(comments);
	} catch (error) {
		response.status(500).json({ msg: error.message });
	}
};

export const deleteComment = async (request, response) => {
	try {
		const comment = await Comment.findById(request.params.id);
		if (!comment) {
			return response.status(404).json({ msg: "Comment not found" });
		}

		await Comment.deleteOne({ _id: comment._id });
		response.status(200).json({ msg: "Comment Deleted" });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
};
