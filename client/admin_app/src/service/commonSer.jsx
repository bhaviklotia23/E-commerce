import { api } from "../utils/api";

/**
 ** This common function is for the Post Request
 * @param {*} url
 * @param {*} body
 */

export const doPost = (url, body) => {
  return new Promise((res, rej) => {
    api
      .post(url, body)
      .then((data) => {
        return res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

/**
 ** This common function is for the Post Request
 * @param {*} url
 * @returns
 */

export const doGet = (url) => {
  return new Promise((res, rej) => {
    api
      .get(url)
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

/**
 ** This common function is for the Update Request
 *
 * @param {*} url
 * @param {*} body
 * @returns
 */

export const doUpdate = (url, body) => {
  return new Promise((res, rej) => {
    api
      .update(url, body)
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

/**
 *
 * @param {*} url
 * @returns
 */
export const doDelete = (url) => {
  return new Promise((res, rej) => {
    api
      .delete(url)
      .then((data) => {
        res(data);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
