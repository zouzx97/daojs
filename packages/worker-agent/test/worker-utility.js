const workerBaseURL = new URL('./workers', document.currentScript.src).href;

export function workerURL(name) {
  return `${workerBaseURL}/${name}`;
}
