import React, { useContext } from "react";
import SkillCheckComponent from "./SkillCheckComponent";
import AttributeListComponent from "./AttributeListComponent";
import ClassListComponent from "./ClassListComponent";
import SkillListComponent from "./SkillListComponent";
import { GlobalContext } from "../context/GlobalContext";

const CharacterComponent = () => {
  const { characters, addCharacter, saveCharacters } =
    useContext(GlobalContext);
  return (
    <div>
      <button onClick={addCharacter} className="Main-buttons">
        Add Character
      </button>
      <button onClick={saveCharacters} className="Main-buttons">
        Save Character
      </button>
      {characters.map((character, index) => (
        <div key={character.id} className="Character-container">
          <h2>Character: {character.id}</h2>
          <SkillCheckComponent characterIdx={index} />
          <div className="Component-Section">
            <AttributeListComponent characterIdx={index} />
            <ClassListComponent characterIdx={index} />
            <SkillListComponent characterIdx={index} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterComponent;
