import React, { createContext, useEffect, useState } from "react";
import { ATTRIBUTE_LIST, SKILL_LIST, CLASS_LIST } from "../consts";
import axios from "axios";

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
            ((characterAttributes[attribute] || 0) - 10) / 2
          );
          return modifierAccumulator || 0;
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

  // handling new character
  const addCharacter = () => {
    setCharacters((prevCharacters) => [
      ...prevCharacters,
      { id: characters.length + 1 },
    ]);

    // setting initial states for new character
    setAttributes((prev) => [...prev, initialAttributes]);
    setSkills((prev) => [...prev, initialSkills]);
  };

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await axios.get(
          "https://recruiting.verylongdomaintotestwith.ca/api/{Krunal-97}/character"
        );
        const data = response?.data?.body;

        if (data.characters) {
          setCharacters(data.characters || [{ id: 1 }]);
        }
        if (data.attributes) {
          setAttributes(data.attributes || initialAttributes);
        }
        if (data.skills) {
          setSkills(data.skills || initialSkills);
        }
      } catch (error) {
        console.error("Error loading characters:", error);
      }
    };

    loadCharacters();
  }, []);

  // saving characters on button click
  const saveCharacters = async () => {
    const data = {
      characters,
      attributes,
      skills,
    };
    const response = await axios.post(
      "https://recruiting.verylongdomaintotestwith.ca/api/{Krunal-97}/character",
      data,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.data.statusCode === 200) {
      alert("Data saved successfully.");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        characters,
        attributes,
        modifiers,
        skills,
        handleUpdateAttribute,
        handleUpdateSkill,
        addCharacter,
        saveCharacters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
