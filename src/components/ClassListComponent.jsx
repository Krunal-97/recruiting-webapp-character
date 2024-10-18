import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { CLASS_LIST } from "../consts";

const ClassListComponent = ({ characterIdx }) => {
  const { attributes } = useContext(GlobalContext);
  const [selectedClass, setSelectedClass] = useState("");

  const characterAttributes = attributes[characterIdx] || {};

  const isClassSelected = (classTitle) => {
    return selectedClass === classTitle;
  };

  const handleSelectClass = (classTitle) => {
    setSelectedClass(classTitle);
  };

  // toggleing classes on selection
  const toggleClassSelection = (classTitle) => {
    if (isClassSelected(classTitle)) {
      handleSelectClass("");
    } else {
      handleSelectClass(classTitle);
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
    <div className="Component-container">
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
              <div style={{ border: "1px solid grey", borderRadius: "4px" }}>
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
