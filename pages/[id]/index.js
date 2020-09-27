import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleteing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = () => {
    setIsDeleteing(true);
    close();
  };

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const noteId = router.query.id;
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...note, completed: e.target.checked }),
      });
      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          {/* <p>{note.description}</p> */}
          <label>
            <input
              type="checkbox"
              defaultChecked={note.completed}
              onChange={handleChange}
            />{" "}
            {note.description}
          </label>{" "}
          <br />
          <p>{new Date(note.createdAt).toLocaleDateString("en-GB")}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();
  return { note: data };
};

export default Note;
