import React, { useEffect, useState } from 'react';
import './SpeechToText.css';

const SpeechToText = () => {
    let recognition
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
   
    const [textRes,setTextRes] = useState("Text...")

    useEffect(() => {
        recognition.onstart = function(){
            alert("Now you can start to talk, after click ok");
            setTextRes("Listening...")
        }
        recognition.onresult = function(e){
            let resultReceived = e.results[0][0].transcript;
            setTextRes(resultReceived)
            console.log(e.results[0][0].transcript)
        }
        recognition.onend = function() {
            console.log('Speech recognition service disconnected');
        };
        recognition.onerror = function(event) {
            console.error(event);
        };
    }, [])

    const startListening = () => {
        setTextRes("Text...")
        recognition.start();
    }
    const stopListening = () => {
        recognition.stop();
        setTextRes("Text...")
    }
    return (
        <div>
            <div className="bg-dark text-center text-white p-5">
                <h6 className="mt-3">Speech to text API</h6>
                <div className="container">
                    <h6 className="h6Elem">{textRes}</h6>
                    <button className="btn btn-primary" onClick={startListening}>Listen</button>&nbsp;
                    <button className="btn btn-primary" onClick={stopListening}>Reset</button>
                </div>
            </div>
        </div>
    )
}
export default SpeechToText;