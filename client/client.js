const vapidPublicKey =
  "BFLzeWSWiOuLa_LX1xo7yPm-dqGHk5F1xSxUC2yWaC5IMyP94oTvoM2ci0cFRzEUhvdy5nDyMGnaP_gkhTNeGso";

//check if the serveice worker can work in the current browser
if ("serviceWorker" in navigator) {
  init();
}

//register the service worker, register our push api, send the notification
async function init() {
  //register service worker
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });
  console.log(register);
  //register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    //public vapid key
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  const sendBtn = await document.getElementById("send-js");

  sendBtn.addEventListener("click", async () => {
    //Send push notification
    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
