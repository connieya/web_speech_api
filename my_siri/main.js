const startButton = document.querySelector("#start");

const recogniton = new webkitSpeechRecognition();
recogniton.continous = false;
recognition.interimResults = false;
recogniton.lang = "ko-KR";
recognition.maxAlternatice = 1;
