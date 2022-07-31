const workBtn = document.querySelector("#work-btn");
workBtn.addEventListener("click", () => {
  const myWorker = new Worker("worker.js");
  myWorker.postMessage("do work");
  myWorker.onmessage = function (e) {
    document.querySelector("#output").innerHTML = e.data;
  };
});

const hahaBtn = document.querySelector("#btn");
hahaBtn.addEventListener("click", () => {
  document.querySelector("#random").innerHTML = "random";
});
