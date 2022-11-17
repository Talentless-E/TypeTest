import React from "react";
import "./App.css";

const secondsToCount = 10;
const paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export default function App() {

   return (
      <div className="app">
         {/* sidebar */}
         <div className="sidebar">
            <div className="timer">00</div>
            <button className="start">Start</button>
            <button className="reset">Reset</button>
         </div>

         <div className="content">
            {/* show the paragraph */}
            <p>{paragraph}</p>

            {/* show the textarea */}
            <form>
               <textarea rows="10" placeholder="Test your typing skills..." />
            </form>
         </div>
      </div>
   );
}
