import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { CLASS_LIST } from "../consts";

const ClassListComponent = ({ characterIdx }) => {
  const { classes, attributes, handleSelectClass } = useContext(GlobalContext);
  const characterAttributes = attributes[characterIdx] || {};
  const selectedClasses = classes[characterIdx] || {};

  const isClassSelected = (classTitle) => {
    return selectedClasses[classTitle] === classTitle;
  };

  // toggleing classes on selection
  const toggleClassSelection = (classTitle) => {
    if (isClassSelected(classTitle)) {
      handleSelectClass(characterIdx, { [classTitle]: null });
    } else {
      handleSelectClass(characterIdx, { [classTitle]: classTitle });
    }
  };

  // checking attribute requirement to find the class
  const meetsRequirements = (classRequirements) => {
    return Object.entries(classRequirements).every(
      ([attribute, minRequirement]) => {
        const characterValue = characterAttributes[attribute] || 0;
        return characterValue >= minRequirement;
      }
    );
  };

  return (
    <div>
      <h1>Classes</h1>
      {Object.entries(CLASS_LIST).map(([classTitle, requirements]) => {
        const isQualified = meetsRequirements(requirements);
        const selected = isClassSelected(classTitle);

        return (
          <div key={classTitle}>
            <p
              style={{
                color: isQualified ? "red" : "white",
                cursor: "pointer",
              }}
              onClick={() => toggleClassSelection(classTitle)}
            >
              {classTitle}
            </p>

            {selected && (
              <div>
                <p>Minimum Requirements:</p>
                <div>
                  {Object.entries(requirements).map(([attribute, minVal]) => (
                    <p key={attribute}>
                      {attribute}: {minVal}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ClassListComponent;
