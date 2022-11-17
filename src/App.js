import React, { useState, useEffect, useRef } from "react";
import useCountDown from "react-countdown-hook";
import "./App.css";

export default function App() {
   const input = useRef();

   const secondsToCount = 60;

   const [timeLeft, { start, reset }] = useCountDown(
      secondsToCount * 1000,
      100
   );
   const [typedText, setTypedText] = useState("");
   const [mistakesIndexes, setMisTakesIndexes] = useState([2]);
   const [paragraph, setParagraph] = useState("");

   //useEffect for fetching random article from fist-text API
   useEffect(() => {
      const fetchData = async () => {
         const data = await fetch(
            "https://fish-text.ru/get?&type=paragraph&number=1"
         ).then((res) => res.json());
         setParagraph(data.text);
      };
      fetchData().catch((error) => console.log(error));
   }, []);

   const findMistakes = (str1, str2) => {
      let mistakes = [];

      str2.split("").forEach((character, index) => {
         if (character !== str1.charAt(index)) mistakes.push(index);
      });
      return mistakes;
   };
   //useEffect for finding mistakes
   useEffect(() => {
      setMisTakesIndexes(findMistakes(paragraph, typedText));
   }, [typedText, paragraph]);

   //useEffect for calculate wpm when the timer hits 0
   useEffect(() => {
      if (typedText.length === 0) return;
      if (timeLeft !== 0) return;
      const wordsTyped = (typedText.length - mistakesIndexes.length) / 5;
      const wpm = wordsTyped * (60 / secondsToCount);
      alert(`You have reached ${wpm.toFixed(2)}WPM!`);
      setTypedText("");
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [timeLeft]);

   const startTimer = () => {
      setTypedText("");
      start();
      FocusInput();
   };

   const resetTimer = () => {
      setTypedText("");
      reset();
   };

   const FocusInput = () => {
      input.current.focus();
   };
   return (
      <div className="app">
         {/* sidebar */}
         <div className="sidebar">
            <div className="timer">{(timeLeft / 1000).toFixed(2)}</div>
            <button className="start" onClick={() => startTimer()}>
               Start
            </button>
            <button className="reset" onClick={() => resetTimer()}>
               Reset
            </button>
         </div>

         <div className="content">
            {/* show the paragraph */}
            <p>
               {paragraph.split("").map((character, index) => {
                  const typed = typedText.length > index;
                  let characterClass = "";
                  if (typed) {
                     characterClass = mistakesIndexes.includes(index)
                        ? "incorrect"
                        : "correct";
                  }
                  return (
                     <span key={index} className={characterClass}>
                        {character}
                     </span>
                  );
               })}
            </p>

            {/* show the textarea */}
            <form>
               <textarea
                  value={typedText}
                  ref={input}
                  onChange={(e) => {
                     setTypedText(e.target.value);
                  }}
                  rows="10"
                  placeholder="Press 'Start' to run the timer..."
               />
            </form>
         </div>
      </div>
   );
}
