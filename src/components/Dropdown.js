import React, { useState, useEffect, useRef } from "react";

// Anything with add event listener gets called first. Then the remaining React event listener functions bubble up.
// It is not good practice to cancel event bubbling.

// If the div element with ref attached it it is removed from the DOM, the value of ref becomes null.

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">
            {selected.label}
            <div className={`menu ${open ? "visible transition" : ""}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
