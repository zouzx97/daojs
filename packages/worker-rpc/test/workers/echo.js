/* eslint-env worker */

onmessage = (message) => {
  postMessage(message.data);
};
