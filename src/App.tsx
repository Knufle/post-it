import CreateStickyNote from "../src/components/CreateStickyNote";
import StickyNote from "../src/components/StickyNote";
import { StickyNoteModel } from "../src/models/StickyNote";
import api from "../src/services/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const queryClient = useQueryClient();

  const { data: stickyNotes = [], refetch, isLoading } = useQuery<StickyNoteModel[]>({
    queryKey: ["stickyNotes"],
    queryFn: async () => {
      const res = await api.get("sticky-notes");
      return res.data;
    },
  });

  const deleteStickyNoteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`sticky-notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickyNotes"] });
    },
  });

  const updateStickyNoteMutation = useMutation({
    mutationFn: async (stickyNote: StickyNoteModel) => {
      const { id, title, description } = stickyNote;
      const data = new FormData();

      data.append("id", String(id));
      data.append("title", title);
      data.append("description", description);

      await api.put("sticky-notes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickyNotes"] });
      alert("Sticky Note updated successfully!");
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <CreateStickyNote onCreateStickyNote={refetch} />
        {isLoading ? (
          <div className="flex flex-col items-center mt-6">
            <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-500" />
            <p className="mt-2 text-gray-500">Loading sticky notes...</p>
          </div>
        ) : (
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            {stickyNotes.map((stickyNote) => (
              <StickyNote
                key={stickyNote.id}
                stickyNote={stickyNote}
                onDelete={() => deleteStickyNoteMutation.mutate(stickyNote.id)}
                onUpdate={(updatedStickyNote) => (event) => {
                  event.preventDefault();
                  updateStickyNoteMutation.mutate(updatedStickyNote);
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
