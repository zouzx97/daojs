const workerBaseURL = new URL('./workers', document.currentScript.src).href;

export default {
  workerURL: name => `${workerBaseURL}/${name}`,
};
