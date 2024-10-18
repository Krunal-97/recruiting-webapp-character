import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { SKILL_LIST } from "../consts";

const SkillListComponent = ({ characterIdx }) => {
  const { skills, handleUpdateSkill, modifiers } = useContext(GlobalContext);
  const characterSkills = skills[characterIdx];
  const characterModifiers = modifiers[characterIdx];

  // find total skill points
  const intelligenceModifier = characterModifiers.Intelligence;
  const totalSkillPoints = 10 + 4 * intelligenceModifier;

  const usedSkillPoints = Object.values(characterSkills).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // a function to increment skill
  const incrementSkill = (skillName) => {
    if (totalSkillPoints > usedSkillPoints) {
      handleUpdateSkill(
        characterIdx,
        skillName,
        characterSkills[skillName] + 1
      );
    } else {
      alert(
        "You cannot spend more points than available. Improve Intellgience to get more points."
      );
    }
  };

  // a function to decrement skill
  const decrementSkill = (skillName) => {
    handleUpdateSkill(
      characterIdx,
      skillName,
      Math.max(characterSkills[skillName] - 1, 0)
    );
  };

  const remainingSkillPoints = totalSkillPoints - usedSkillPoints;

  return (
    <div>
      <h1>Skills</h1>
      <h5>
        Total Skill Points Available: {totalSkillPoints} | Remaining Skill
        Points: {remainingSkillPoints}
      </h5>
      {SKILL_LIST.map((skill) => {
        const modifier = characterModifiers[skill.attributeModifier]; //  modifier for a respective skill
        const skillValue = characterSkills[skill.name] + modifier; // skill value = points + modifier
        return (
          <div key={skill.name}>
            <p>
              {skill.name} Points: {characterSkills[skill.name]}
              {"("} Modifier:
              {skill.attributeModifier}
              {")"}: {modifier} |{" "}
              <button onClick={() => incrementSkill(skill.name)}>+</button>
              <button onClick={() => decrementSkill(skill.name)}>-</button> |
              Total: {skillValue}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SkillListComponent;
