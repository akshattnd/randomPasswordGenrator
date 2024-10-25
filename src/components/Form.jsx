import React, { useState, useEffect, useCallback, useRef } from "react";

function Form() {
  const [input, setInput] = useState("");
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const passwordRef = useRef("");
  function handleInput(e) {
    e.preventDefault();
    let value = e.target.value;
    setInput(value);
  }

  function handleLength(e) {
    let value = e.target.value;
    setLength(value);
  }
  function handleCheckBox(e) {
    let value = e.target.id;
    if (value == "num") {
      setNum((p) => !p);
    } else if (value == "char") {
      setChar((p) => !p);
    }
  }
  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordinput);
  }, [input]);
  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (num) str += "012345679";
    if (char) str += "!@#$%^&*-_=+|;:/";
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setInput(pass);
  }, [num, char, length, setInput]);

  useEffect(() => {
    passwordGenerater();
  }, [num, char, length, setInput]);

  return (
    <>
      <form
        action="#"
        className="bg-gray-100  max-w-xl mx-auto m-5 p-5 container font-serif shadow-lg rounded-lg  "
      >
        <div className="m-2">
          <div className="relative max-w-lg  ">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-lg text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-xl border border-gray-900    focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Search"
              required
              value={input}
              onChange={handleInput}
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyToClipBoard}
              type="submit"
              className="absolute top-0 end-0 px-5 py-1.5 h-full text-lg font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 "
            >
              Copy
            </button>
          </div>
        </div>

        <div className="checkbox px-4 mt-5  ">
          <div className="flex  gap-x-1">
            <div className="flex items-center me-4">
              <input
                id="length"
                type="range"
                className="w-sm text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                onChange={handleLength}
                min={6}
                max={20}
                value={length}
              />
              <label
                htmlFor="length"
                className="ms-2 text-lg font-bold text-gray-500 "
              >
                length({length})
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="num"
                type="checkbox"
                checked={num}
                onChange={handleCheckBox}
                className="w-5 h-5 mx-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="num"
                className="ms-2 text-lg font-bold text-gray-500 "
              >
                Numbers
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="char"
                type="checkbox"
                value=""
                checked={char}
                onChange={handleCheckBox}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
              <label
                htmlFor="char"
                className="ms-2 text-lg font-bold text-gray-500 "
              >
                Charaters
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
