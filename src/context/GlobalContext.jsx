import React, { createContext, useState } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST, CLASS_LIST } from "../consts";

// ------ Context Provider: --------
export const GlobalContext = createContext();

const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attribute) => {
  acc[attribute] = 10;
  return acc;
}, {});

const initialSkills = SKILL_LIST.reduce((acc, skill) => {
  acc[skill.name] = 0;
  return acc;
}, {});

export const GlobalContextProvider = ({ children }) => {
  const [attributes, setAttributes] = useState([initialAttributes]);
  const [skills, setSkills] = useState([initialSkills]);
  const [characters, setCharacters] = useState([{ id: 1 }]);

  // console.log("Attributes:", attributes);
  // console.log("Skills:", skills);

  // calculate modifiers whenever attributes change
  const calculateModifiers = (attributes) => {
    return attributes.map((characterAttributes) =>
      Object.keys(characterAttributes).reduce(
        (modifierAccumulator, attribute) => {
          // modifier = Math.floor((singleAttributeValue - 10) / 2)
          modifierAccumulator[attribute] = Math.floor(
            (characterAttributes[attribute] - 10) / 2
          );
          return modifierAccumulator;
        },
        {}
      )
    );
  };

  // function to update a value for specific attribute of a selected character
  const handleUpdateAttribute = (
    characterIdx,
    attributeToUpdate,
    updatedVal
  ) => {
    setAttributes((prevState) => {
      const updatedAttributes = [...prevState];
      updatedAttributes[characterIdx] = {
        ...updatedAttributes[characterIdx],
        [attributeToUpdate]: updatedVal,
      };
      return updatedAttributes;
    });
  };

  // function to update a value for specific skill of a selected character
  const handleUpdateSkill = (characterIdx, skillName, updatedVal) => {
    setSkills((prevState) => {
      const updatedSkills = [...prevState];
      updatedSkills[characterIdx] = {
        ...updatedSkills[characterIdx],
        [skillName]: updatedVal, // set updated skill
      };
      return updatedSkills;
    });
  };

  const modifiers = calculateModifiers(attributes);

  // console.log("Modifiers:", modifiers);
  return (
    <GlobalContext.Provider
      value={{
        characters,
        attributes,
        modifiers,
        skills,
        handleUpdateAttribute,
        handleUpdateSkill,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
