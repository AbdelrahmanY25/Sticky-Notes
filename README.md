# Sticky Notes App

A simple web-based application for creating and organizing sticky notes. This app allows users to create, categorize, and customize notes with different colors. Notes are saved in the browser's local storage, allowing data persistence across sessions.

## Features

- **Add New Notes**: Easily create new sticky notes with customizable colors.
- **Color Customization**: Choose from six colors to categorize each note.
- **Auto-save**: Notes and color selections are automatically saved to local storage, enabling data persistence.
- **Category Display**: Notes are organized and counted by color categories.
- **Delete Notes**: Remove individual notes, with changes reflected immediately.

## Code Overview

### 1. Selecting HTML Elements
- `divNotes`: Container for the notes.
- `addNotes`: Element for adding a new note.
- `divCat`: Element displaying color categories and counts.

### 2. Data Arrays
- `arrayOfNotes`: Stores notes information.
- `arrayOfColors`: Saves chosen colors for each note.
- `arrayOfTexts`: Stores note content.
- `uniquearrayOfColors`: Contains unique colors used across notes for categorization.

### 3. Local Storage Functions
- `addNotesToLocalStoraage(arrayOfNotes)`: Saves notes to local storage.
- `addColorsToLocalStoraage(arrayOfColors)`: Saves note colors to local storage.
- `addNotesTextToLocalStoraage(arrayOfTexts)`: Saves note text to local storage.
- `getNotesFromLocalstorage()`, `getColorsFromLocalstorage()`, `getTextsFromLocalstorage()`: Retrieve saved notes, colors, and text from local storage.

### 4. Core Functionalities
- **`addNote()`**: Creates a new note with a textarea for content, color selection, and delete button.
- **`changeColor()`**: Allows users to change the note color by clicking on color options.
- **`addTxt()`**: Monitors and saves changes to the text in real time.
- **`deleteSapn(index)`**: Deletes a note and updates local storage.
- **`createDivsOfCategories()`**: Displays color categories with the count of notes per color.
- **`filterColorsOnCategories(nameOccurrences)`**: Updates color categories with the current count of notes for each color.

### 5. Utilities
- `rgbToHex(rgb)`: Converts RGB color values to hexadecimal format.
- `countNameOccurrences(namesArray)`: Counts occurrences of each color in `arrayOfColors`.
