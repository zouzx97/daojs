export default function loadStyle(url) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', url);
  document.head.appendChild(link);
}