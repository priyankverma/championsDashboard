export const apiToken =
  "&token=MG5rGXMszfU8_6lW92ntbVTClkGkUXn9CIzP5TC_Amp-xNkrXxY"; // the token for the pandascore API
export const SERVER_URL = "https://api.pandascore.co/lol/champions?"; //  the server URL for the API
const log = true;


/**
 *
 * @param {*} e - the error event object returned
 * @param {function} error - the function the will be executed if api results to an error
 */
const catchErrorHandle = (e, error) => {
  e.catch = true;
  if (e instanceof TypeError) {
    e.message = "Error -2244";
    e.type = "network";
  } else if (e instanceof SyntaxError) {
    e.message = "Internal server error!";
    e.type = "server";
  } else {
    e.message = "Something went wrong. Please try after some time!";
    e.type = "undefined";
  }
  return error(e);
};

/**
 *
 * @param {object} res - the response received from the async call
 * @param {function} success - the success callback, executed if the api succeeds
 * @param {function} error -  the success callback, executed if the api returns an error
 */
const responseHandle = async (res, success, error) => {
  if (res.ok) {
    success(await res.json());
  } else if (res.status === 401) {
    // error(await { message: "Server is down. Please try again later." });
  } else if (res.status === 403) {
    // error(await { message: "Server is down. Please try again later." });
  } else {
    error(await res.json());
  }
};

/**
 *
 * @param {string} url - the api url
 * @param {object} init - the object containing all the headers and the type of the request (GET || POST)
 * @param {function} success - the success callback, executed if the api succeeds
 * @param {function} error -  the success callback, executed if the api returns an error
 */
const callAPI = (url, init, success, error) => {
  return fetch(url, init)
    .then((res) => {
      responseHandle(res, success, error);
    })
    .catch((e) => {
      if (log) console.log("error : ", SERVER_URL + url, init, e);
      catchErrorHandle(e, error);
    });
};

/**
 *
 * @param {string} url - the api url
 * @param {object} url - the object containing all the headers
 * @param {object} params - the object containing the body to be sent on case of post and the params in the URL in case of get
 * @param {function} success - the success callback, executed if the api succeeds
 * @param {function} error -  the success callback, executed if the api returns an error
 */
export const _get = (url, headers = {}, params = {}, success, error) => {
  const init = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...headers },
  };

  // Manage params of url
  let url_tail = "";
  for (let key in params) url_tail = `${url_tail}${key}=${params[key]}&`;
  return callAPI(url + url_tail, init, success, error);
};
