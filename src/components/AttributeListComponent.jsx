import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const AttributeListComponent = ({ characterIdx }) => {
  const { attributes, handleUpdateAttribute, modifiers } =
    useContext(GlobalContext);
  const characterAttributes = attributes[characterIdx];

  const sumOfAllAttributes = () => {
    return Object.values(characterAttributes).reduce(
      (acc, currVal) => acc + currVal,
      0
    );
  };

  // increment attribute value for a specific character
  const incrementAttribute = (attributeName) => {
    const total = sumOfAllAttributes();
    // console.log("Total:", total);
    if (total < 70) {
      handleUpdateAttribute(
        characterIdx,
        attributeName,
        characterAttributes[attributeName] + 1
      );
    } else {
      alert("A character can have up to 70 Delegated Attribute Points.");
    }
  };

  // decrement attribute value for a specific character
  const decrementAttribute = (attributeName) => {
    handleUpdateAttribute(
      characterIdx,
      attributeName,
      Math.max(characterAttributes[attributeName] - 1, 0)
    );
  };

  const characterModifiers = modifiers[characterIdx];

  return (
    <div className="Component-container">
      <h1>Attributes</h1>
      {Object.keys(characterAttributes).map((attribute) => (
        <div key={attribute}>
          {attribute}: {characterAttributes[attribute]} Modifier:{" "}
          {characterModifiers[attribute]}
          <button onClick={() => incrementAttribute(attribute)}>+</button>
          <button onClick={() => decrementAttribute(attribute)}>-</button>
        </div>
      ))}
      <p>Total: {sumOfAllAttributes()}</p>
    </div>
  );
};

export default AttributeListComponent;
