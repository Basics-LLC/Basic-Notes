if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker &&
      navigator.serviceWorker.register('./serviceWorker.js');
  });
}
