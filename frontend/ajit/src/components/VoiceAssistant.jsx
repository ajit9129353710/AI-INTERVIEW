import { useEffect, useRef, useState } from "react";
import {
Mic,
MicOff,
Volume2,
AlertCircle,
CheckCircle2,
} from "lucide-react";

function VoiceAssistant({
onTranscript,
language = "en-IN",
disabled = false,
}) {
const [isListening, setIsListening] = useState(false);
const [transcript, setTranscript] = useState("");
const [error, setError] = useState("");

const recognitionRef = useRef(null);
const transcriptRef = useRef("");

useEffect(() => {
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  setError(
    "Speech recognition is not supported in this browser. Try a supported browser such as Chrome."
  );
  return;
}

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = language;

recognition.onresult = (event) => {
  let finalText = "";
  let interimText = "";

  for (
    let i = event.resultIndex;
    i < event.results.length;
    i++
  ) {
    const text = event.results[i][0].transcript;

    if (event.results[i].isFinal) {
      finalText += text + " ";
    } else {
      interimText += text;
    }
  }

  if (finalText) {
    const updatedTranscript =
      transcriptRef.current + finalText;

    transcriptRef.current = updatedTranscript;
    setTranscript(updatedTranscript);

    if (onTranscript) {
      onTranscript(updatedTranscript);
    }
  }

  if (interimText) {
    setTranscript(
      transcriptRef.current + interimText
    );
  }
};

recognition.onerror = (event) => {
  if (event.error === "not-allowed") {
    setError(
      "Microphone permission denied. Allow microphone access in your browser settings."
    );
  } else if (event.error === "no-speech") {
    setError("No speech detected. Please try speaking again.");
  } else if (event.error !== "aborted") {
    setError("Voice recognition failed. Please try again.");
  }

  setIsListening(false);
};

recognition.onend = () => {
  setIsListening(false);
};

recognitionRef.current = recognition;

return () => {
  recognition.stop();
  recognitionRef.current = null;
};

}, [language, onTranscript]);

const startListening = () => {
if (disabled || !recognitionRef.current) return;

setError("");

try {
  recognitionRef.current.start();
  setIsListening(true);
} catch {
  setError(
    "Microphone could not start. Please try again."
  );
}

};

const stopListening = () => {
if (recognitionRef.current) {
recognitionRef.current.stop();
}

setIsListening(false);

};

const clearTranscript = () => {
transcriptRef.current = "";
setTranscript("");

if (onTranscript) {
  onTranscript("");
}

};

return (
<section className="voice-assistant">
<div className="voice-assistant-header">
<div className="feature-icon">
<Volume2 size={23} />
</div>

    <div>
      <h3>Voice Answer Assistant</h3>
      <p>Speak naturally to answer the interview question.</p>
    </div>
  </div>

  <div className="voice-assistant-controls">
    <button
      type="button"
      className={`voice-mic-button ${
        isListening ? "listening" : ""
      }`}
      onClick={
        isListening ? stopListening : startListening
      }
      disabled={disabled || !recognitionRef.current}
      aria-label={
        isListening ? "Stop recording" : "Start recording"
      }
    >
      {isListening ? (
        <MicOff size={24} />
      ) : (
        <Mic size={24} />
      )}
    </button>

    <div>
      <strong>
        {isListening
          ? "Listening..."
          : "Ready to speak"}
      </strong>

      <p>
        {isListening
          ? "Speak clearly. Press stop when finished."
          : "Press the microphone to start speaking."}
      </p>
    </div>
  </div>

  {isListening && (
    <div className="voice-recording-indicator">
      <span />
      Recording your answer
    </div>
  )}

  {transcript && (
    <div className="voice-transcript">
      <div className="voice-transcript-heading">
        <CheckCircle2 size={17} />
        <strong>Recognized Speech</strong>
      </div>

      <p>{transcript}</p>

      <button
        type="button"
        className="button button-outline button-small"
        onClick={clearTranscript}
      >
        Clear Transcript
      </button>
    </div>
  )}

  {error && (
    <div className="voice-error">
      <AlertCircle size={17} />
      <span>{error}</span>
    </div>
  )}

  <p className="voice-language-note">
    Recognition language: {language}
  </p>
</section>

);
}

export default VoiceAssistant;