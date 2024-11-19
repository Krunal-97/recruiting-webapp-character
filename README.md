# Webapp Character

A React-based web application for managing character sheets in tabletop RPGs (e.g., DnD, Pathfinder). The app allows users to create and manage characters, attributes, skills, and perform skill checks.

## Setup

### 1. Create a Repository

- Click `Use this template` on the repository page.
- Name the repo `webapp-character`.

### 2. Install Dependencies

Clone the repo and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/webapp-character.git
cd webapp-character
npm install
```

### Start the app with:
```bash
npm start
```
## Features

- **Attributes**: 6 core attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) that can be incremented or decremented independently.
- **Ability Modifiers**: Modifiers are calculated for each attribute. These modifiers affect skills and other related actions.
- **Classes**: Display available character classes and highlight when a character meets the minimum attribute requirements for that class.
- **Skills**: Implement a skill system where characters can spend points based on attribute modifiers. Skills show the total value, which combines points spent and attribute modifiers.
- **Skill Check**: Perform skill checks by rolling a die and adding the skill modifier to determine success or failure based on a given Difficulty Class (DC).
- **Party Skill Check**: Perform a group skill check where the character with the highest skill modifier attempts the action.
- **Character Saving**: Save and retrieve character data via API calls using POST and GET requests.

