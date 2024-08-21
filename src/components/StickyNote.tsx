import React, { FormEventHandler, useState } from "react";
import { StickyNoteModel } from "../models/StickyNote";
import { TrashIcon } from "@heroicons/react/16/solid";

interface StickyNoteProps {
  stickyNote: StickyNoteModel;
  onDelete: (id: number) => void;
  onUpdate: (
    stickyNote: StickyNoteModel
  ) => FormEventHandler<HTMLFormElement> | undefined;
}

export default function StickyNote(props: StickyNoteProps) {
  const [title, setTitle] = useState(props.stickyNote.title);
  return (
    <div className="m-4 rounded bg-yellow-300 p-4">
      <form
        onSubmit={props.onUpdate({
          id: props.stickyNote.id,
          title,
          description: props.stickyNote.description,
        })}
      >
        <input
          className="bg-yellow-300 text-center border-none"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit" className="invisible hidden">
          Update Sticky Note
        </button>
      </form>
      <br />
      <button
        className="mt-2 rounded bg-red-500 p-1 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:bg-red-600 border border-transparent"
        onClick={() => props.onDelete(props.stickyNote.id)}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
