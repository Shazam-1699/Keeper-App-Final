import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);

    setNote({
      title: "",
      content: "",
    });
    setBold(false);
    setItalic(false);
    setUnderline(false);

    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  const toggleBold = () => setBold((prevValue) => !prevValue);
  const toggleItalic = () => setItalic((prevValue) => !prevValue);
  const toggleUnderline = () => setUnderline((prevValue) => !prevValue);

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            style={{
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
            }}
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
          }}
        />

        <Fab className="Bold" onClick={toggleBold}>
          <FormatBoldIcon />
        </Fab>
        <Fab className="Italic" onClick={toggleItalic}>
          <FormatItalicIcon />
        </Fab>
        <Fab className="Underline" onClick={toggleUnderline}>
          <FormatUnderlinedIcon />
        </Fab>

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
