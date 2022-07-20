import React, { useEffect, useState } from "react";
import "./App.css";
import * as speech from "@tensorflow-models/speech-commands";
import * as tf from "@tensorflow/tfjs";

const App = () => {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log("Model Loaded");
    await recognizer.ensureModelLoaded();
    console.log(" @@", recognizer.wordLabels());
  };

  useEffect(() => {
    loadModel();
  }, []);

  return <div className='App'></div>;
};

export default App;
