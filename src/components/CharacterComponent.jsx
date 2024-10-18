import React, { useContext } from "react";
import SkillCheckComponent from "./SkillCheckComponent";
import AttributeListComponent from "./AttributeListComponent";
import ClassListComponent from "./ClassListComponent";
import SkillListComponent from "./SkillListComponent";
import { GlobalContext } from "../context/GlobalContext";

const CharacterComponent = () => {
  const { characters } = useContext(GlobalContext);
  return (
    <div>
      {characters.map((character, index) => (
        <div key={character.id}>
          <h2>Character: {character.id}</h2>
          <SkillCheckComponent characterIdx={index} />
          <AttributeListComponent characterIdx={index} />
          <ClassListComponent characterIdx={index} />
          <SkillListComponent characterIdx={index} />
        </div>
      ))}
    </div>
  );
};

export default CharacterComponent;
