//Access to applications and files
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Adds a static midleware to serve assets in Public folder
app.use(express.static("public"));

//Returns saved notes as JSON
app.get("/api/notes", (req, res) => {
res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Creates new data 
app.post("/api/notes", (req, res) => {
  const addNote = req.body; 
  addNote.id = uuid();
  noteData.push(addNote);
  const jsonData = JSON.stringify(noteData);
  fs.writeFile("./db/db.json", jsonData, (err) => {
    err ? console.log(err) : res.send(addNote);
  });
});

//Removes request
app.delete("/api/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
  let noteId = req.params.id.toString();

  //filter notes that don't have a matching id.
  noteList = noteList.filter((selected) => {
    return selected.id != noteId;
  });
  //write and displays updated notes
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

// Request to send data to server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Returns HTML notes.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Server Setup
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});