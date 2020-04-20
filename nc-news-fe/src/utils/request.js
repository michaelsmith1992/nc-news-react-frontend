import axios from 'axios';

const request = axios.create({
  baseURL: 'https://msmith-be-nc-news.herokuapp.com/api',
});

export const getArticles = async (topic, sort_by, order, limit) => {
  const { data } = await request.get('/articles', {
    params: { topic, sort_by, order, limit },
  });
  return data;
};

export const getComments = async (id, limit) => {
  const { data } = await request.get(`/articles/${id}/comments`, {
    params: { limit },
  });
  return data;
};

export const getArticle = async (id) => {
  const { data } = await request.get(`/articles/${id}`);
  return data;
};

export const getTopics = async () => {
  const { data } = await request.get('/topics');
  return data;
};

export const postComments = async (id, username, body) => {
  const { data } = await request.post(`/articles/${id}/comments`, {
    username,
    body,
  });
  return data;
};

export const deleteComments = async (id) => {
  return await request.delete(`/comments/${id}`);
};

export const deleteArticles = async (id) => {
  return await request.delete(`/articles/${id}`);
};

export const patchVotes = async (id, inc_votes) => {
  const { data } = await request.patch(`/articles/${id}`, {
    inc_votes,
  });
  return data;
};

export const patchCommentVotes = async (id, inc_votes) => {
  const { data } = await request.patch(`/comments/${id}`, {
    inc_votes,
  });
  return data;
};

export const getAllUsers = async () => {
  const { data } = await request.get(`/users`);
  return data;
};

export const getUser = async (username) => {
  const { data } = await request.get(`/users/${username}`);
  return data;
};

export const postArticles = async (title, body, topic, author, votes) => {
  const { data } = await request.post(`/articles`, {
    title,
    body,
    topic,
    author,
    votes,
  });
  return data;
};
