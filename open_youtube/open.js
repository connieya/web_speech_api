const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "ko-KR";

let p = document.createElement("p");

console.log("open . js ");
recognition.addEventListener("result", (e) => {
  console.log("result func");
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  console.log("text  =====> ", text);
  console.log("event = ", e);
  // console.log("event timeStampe = ", e.timeStamp);
  // console.log("event results = ", e.results);
  // console.log("event results -> isFinal = ", e.results[0].isFinal);
  // p.innerText = text;
  p.innerText = text;

  // if (text.includes("이름이 뭐야") || text.includes("이름이")) {
  // } else if (text.includes("막둥아 비디오")) {
  // } else {
  // }
  if (e.results[0].isFinal) {
    if (text.includes("잘 지내")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "응";
      texts.appendChild(p);
    }
    if (text.includes("이름이 뭐야") || text.includes("이름이")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "내 이름은 코니야";
      texts.appendChild(p);
    }
    if (text.includes("막둥아 비디오")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "opening youtube channel";
      texts.appendChild(p);
      console.log("opening youtube");
      window.open("https://www.youtube.com/watch?v=iMTblJbmam4");
    }
    p = document.createElement("p");
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
