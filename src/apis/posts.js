import axios from "axios";

export async function publishPost({ title, content }) {
  const response = await axios.post("/api/posts", {title, content});
  return response.data;
}

export async function fetchPost(postId) {
  const response = await axios.get(`/api/posts/${postId}`);
  return response.data;
}
