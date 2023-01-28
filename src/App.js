import "./styles.css";
import { useState } from "react";

const hexCodes = ["#ff0000", "#00ff00", "#0000ff"];
const defaultGuesses = Array(hexCodes.length).fill("#000000");

const hexToRgb = (hex) => {
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};

const getHexSimilarity = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  // Euclidean distance
  const dist = Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
      Math.pow(rgb1[1] - rgb2[1], 2) +
      Math.pow(rgb1[2] - rgb2[2], 2)
  );
  const similarity = (255 - dist) / 255;
  return Math.round(similarity);
};

const Color = ({ hex }) => {
  const colorStyle = {
    width: "20rem",
    height: "5rem",
    marginInline: "auto",
    background: hex
  };
  return <div style={colorStyle}></div>;
};

const SmallColor = ({ hex }) => {
  const colorStyle = {
    width: "5rem",
    height: "5rem",
    margin: "0.5rem auto",
    background: hex
  };
  return <div style={colorStyle}></div>;
};

const Guess = ({ guess, changeGuess }) => {
  return (
    <div>
      <label style={{ marginRight: ".3rem" }}>#</label>
      <select value={guess[1]} onChange={changeGuess} id="1">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
      </select>
      <select value={guess[2]} onChange={changeGuess} id="2">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
      </select>
      <select value={guess[3]} onChange={changeGuess} id="3">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
      </select>
      <select value={guess[4]} onChange={changeGuess} id="4">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
      </select>
      <select value={guess[5]} onChange={changeGuess} id="5">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
      </select>
      <select value={guess[6]} onChange={changeGuess} id="6">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
      </select>
    </div>
  );
};

const Quiz = ({ guesses, setGuesses, setSubmitted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goForward = () => setCurrentIndex((idx) => idx + 1);
  const goBackward = () => setCurrentIndex((idx) => idx - 1);

  const changeGuess = (e) =>
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      let currentGuess = prevGuesses[currentIndex];
      currentGuess = currentGuess.split("");
      currentGuess[e.target.id] = e.target.value;
      currentGuess = currentGuess.join("");
      newGuesses[currentIndex] = currentGuess;
      return newGuesses;
    });

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="Quiz">
      <h2>
        Question {currentIndex + 1} / {hexCodes.length}
      </h2>
      <Color hex={hexCodes[currentIndex]} />
      <p>Guess the hex value of this color</p>
      <Guess guess={guesses[currentIndex]} changeGuess={changeGuess} />
      <div>
        <button onClick={goBackward} disabled={!currentIndex}>
          Previous
        </button>
        <button
          onClick={goForward}
          disabled={currentIndex === hexCodes.length - 1}
        >
          Next
        </button>
      </div>
      <button
        onClick={handleSubmit}
        disabled={currentIndex !== hexCodes.length - 1}
      >
        Submit
      </button>
    </div>
  );
};

const Results = ({ guesses, reset }) => {
  return (
    <div class="Results">
      <h2>Results</h2>
      {hexCodes.map((hexCode, i) => (
        <div id={crypto.randomUUID}>
          <div>Question {i + 1}</div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p>Correct Answer</p>
              <SmallColor hex={hexCode} />
              <div>{hexCode}</div>
            </div>
            <div>
              <p>Your Guess</p>
              <SmallColor hex={guesses[i]} />
              <div>{guesses[i]}</div>
            </div>
            <div>
              <p>Score</p>
              <div>
                {getHexSimilarity(hexCode.slice(1), guesses[i].slice(1))}%
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onSubmit={reset}>Play again</button>
    </div>
  );
};

export default function App() {
  const [guesses, setGuesses] = useState(defaultGuesses);
  const [submitted, setSubmitted] = useState(false);
  const clearGuesses = () => setGuesses(defaultGuesses);

  return (
    <div className="App">
      <h1>Hex Colors Quiz</h1>
      {submitted ? (
        <Results guesses={guesses} clearGuesses={clearGuesses} />
      ) : (
        <Quiz
          setSubmitted={setSubmitted}
          guesses={guesses}
          setGuesses={setGuesses}
        />
      )}
    </div>
  );
}
