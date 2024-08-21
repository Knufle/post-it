import { FormEvent, useEffect, useState } from 'react';
import CreateStickyNote from '../src/components/CreateStickyNote';
import StickyNote from '../src/components/StickyNote';
import { StickyNoteModel } from '../src/models/StickyNote';
import api from '../src/services/api';

const Home = () => {
  const [stickyNotes, setStickyNotes] = useState<StickyNoteModel[]>([]);

  useEffect(() => {
    fetchStickyNotes();
  }, []);

  function fetchStickyNotes() {
    api.get('sticky-notes').then((res) => setStickyNotes(res.data));
  }

  function deleteStickyNote(id: number) {
    api.delete(`sticky-notes/${id}`).then(() => fetchStickyNotes());
  }

  function updateStickyNote(stickyNote: StickyNoteModel) {
    return async (event: FormEvent) => {
      event.preventDefault();

      const { id, title, description } = stickyNote;
      const data = new FormData();

      data.append('id', String(id));
      data.append('title', title);
      data.append('description', description);

      await api.put('sticky-notes', data);

      fetchStickyNotes();

      alert('Sticky Note updated successfully!');
    };
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <CreateStickyNote onCreateStickyNote={fetchStickyNotes} />
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {stickyNotes.map((stickyNote) => (
            <StickyNote
              key={stickyNote.id}
              stickyNote={stickyNote}
              onDelete={deleteStickyNote}
              onUpdate={updateStickyNote}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;