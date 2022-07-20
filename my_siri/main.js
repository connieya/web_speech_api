const startBtn = document.querySelector("#start-btn");
const recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.lang = "ko-KR";
recognition.interimResults = false;
recognition.maxAlternative = 1;

//const synth=window.speechSynthesis;

startBtn.addEventListener("click", () => {
  recognition.start();
});

/*let utter = new SpeechSynthesisUtterance("Hi, How are you?");
utter.onend = () =>{
    recognition.start();
};*/

recognition.onresult = (e) => {
  const transcript = e.results[e.results.length - 1][0].transcript.trim();

  if (transcript === "안녕") {
    console.log("하위");
    /*recognition.stop();
        utter.text =" Hi, How are you?";
        console.log("Hi");
        synth.speak(utter);*/
  }
};
