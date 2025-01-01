import apiClient from "./axios";

export const PostsService = {
    // Get posts with limit parameter to match your current implementation
    getPosts: (limit = 5) => {
        return apiClient.get(`/posts`, {
            params: {_limit: limit}
        })
    }
}