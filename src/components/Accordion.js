import React, { useState } from "react";

const Accordion = ({ items }) => {
  // First argument is the piece of state that we are trying to keep track of.
  // Second argument is a function that we call to update our piece of state. This is also called the setter.
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    if (activeIndex === null) {
      setActiveIndex(index);
    } else {
      setActiveIndex(null);
    }
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";
    return (
      // Fragments let you group a list of children without adding extra nodes to the DOM.
      // For example, it can replace a div.
      <React.Fragment key={item.title}>
        <div
          className={`title ${active}`}
          onClick={() => onTitleClick(index)}
          // The onTitleClick needs to be a function. If it's not, it will run right as the page loads.
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
