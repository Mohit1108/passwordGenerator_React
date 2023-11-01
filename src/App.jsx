import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLenght] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()?/+_-~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);


const CopyPassword = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password);
  setCopied(true);


}, [password])
useEffect(() =>{passwordGenerator()},[length, numberAllowed, characterAllowed, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3"> Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="outline-none w-full py-1 px-3" ref={passwordRef}
          ></input>
          <button onClick={CopyPassword} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          {copied ? 'Password Copied!' : 'Copy Password'}
          </button>
               

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            ></input>
            <label> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            ></input>
            <label> Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            ></input>
            <label> Characters</label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
