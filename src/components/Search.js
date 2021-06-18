import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");

  console.log("I run with every render");

  // the useEffect function is somewhat like a lifecycle method.
  // first argument is always a function.
  // second argument will be either nothing, an array, or an array with something inside of it.
  // empty array means we want to run the function at the initial render.
  // no array means we want to run at initial render and run after every re render.
  // if array with value, we want to run at the initial render and we want to run the function after every re render if
  // some element inside the array changed last render.
  useEffect(() => {
    const search = async () => {
      await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
    };
    search();
  }, [term]);
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
