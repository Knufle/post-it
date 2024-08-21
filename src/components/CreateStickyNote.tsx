import React, { FormEvent, useState } from "react";
import api from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateStickyNoteProps {
  onCreateStickyNote: () => void;
}

export default function CreateStickyNote(props: CreateStickyNoteProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const createStickyNoteMutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      await api.post("sticky-notes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickyNotes"] });
      setTitle("");
      setDescription("");
      props.onCreateStickyNote();
      alert("Sticky Note created successfully!");
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    createStickyNoteMutation.mutate();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="text-gray-700">
          Create a new sticky note by filling the fields
        </legend>
        <div className="flex space-x-4 mt-4">
          <div>
            <label
              htmlFor="title"
              className="block text-left text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                value={title}
                placeholder="sticky note title"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-left text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="description"
                placeholder="sticky note description"
                value={description}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
        </div>
      </fieldset>
      <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-slate-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 mt-4"
      >
        Create Sticky Note
      </button>
    </form>
  );
}
