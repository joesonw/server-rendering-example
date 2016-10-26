import http from 'superagent';

export const get = () => dispatch => {
  http
    .get('/todo')
    .end((error, response) => {
      dispatch({
        type: 'get',
        error,
        body: response.body,
      });
    });
}

export const post = (text) => dispatch => {
  http
    .post('/todo')
    .send({
      text,
    })
    .end((error, response) => {
      get()(dispatch);
    });
}

export const put = (id, text) => dispatch => {
  http
    .put(`/todo/${id}`)
    .send({
      text,
    })
    .end((error, response) => {
      get()(dispatch);
    });
}

export const del = (id) => dispatch => {
  http
    .del(`/todo/${id}`)
    .end((error, response) => {
      get()(dispatch);
    });
}
