import axios from 'axios';

const base = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

// 조회
const getComments = async () => {
  const response = await base.get(`/comments`);
  return response.data;
};

// 추가
const addComment = async (newComment) => {
  await base.post(`/comments`, newComment);
};

// 삭제
const deleteComment = async (id) => {
  await base.delete(`/comments/${id}`);
};

// 수정
const editComment = async (editedComment) => {
  await base.patch(`/comments/${editedComment.id}`, editedComment);
};

export { getComments, addComment, deleteComment, editComment };
