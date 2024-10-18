import React from "react";
import SkillCheckComponent from "./SkillCheckComponent";
import AttributeListComponent from "./AttributeListComponent";
import ClassListComponent from "./ClassListComponent";
import SkillListComponent from "./SkillListComponent";

const CharacterComponent = () => {
  return (
    <div>
      <SkillCheckComponent />
      <AttributeListComponent />
      <ClassListComponent />
      <SkillListComponent />
    </div>
  );
};

export default CharacterComponent;
