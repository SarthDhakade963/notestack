"use client";

import { useState } from "react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import useSWR, { mutate } from "swr";
import type { Note, NotesResponse } from "@/types/note";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  Loader2,
  MoreVertical,
  Trash2,
  Plus,
} from "lucide-react";
import type { Fetcher } from "swr";
import CreateNoteDialog from "./NoteDialog";

const fetcher: Fetcher<NotesResponse, string> = (url) =>
  fetchWithToken(url, {
    method: "GET",
  }).then((res) => res.json() as Promise<NotesResponse>);

export default function NotesList() {
  const { data, error, isLoading } = useSWR<NotesResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/note`,
    fetcher
  );

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const handleCreateNote = async () => {
    if (!form.title.trim() || !form.content.trim())
      return alert("All fields required");

    try {
      setIsSubmitting(true);
      const res = await fetchWithToken("/note", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create note");

      setForm({ title: "", content: "" });
      setDialogOpen(false);
      mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/note`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating note");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✏️ Edit Note
  const handleEditNote = (note: Note) => {
    setForm({ title: note.title, content: note.content });
    setEditNoteId(note.id);
    setDialogOpen(true);
  };

  const handleUpdateNote = async () => {
    if (!editNoteId) return;
    if (!form.title.trim() || !form.content.trim())
      return alert("All fields required");

    try {
      setIsSubmitting(true);
      const res = await fetchWithToken(`/note/${editNoteId}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update note");

      setForm({ title: "", content: "" });
      setEditNoteId(null);
      setDialogOpen(false);
      mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/note`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating note");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🗑️ Delete Note
  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetchWithToken(`/note/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete note");

      mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/note`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting note");
    }
  };

  // UI States
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="text-lg font-medium">Loading your notes...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-center text-red-600">
        Failed to load notes.
      </div>
    );

  // Empty
  if (!data?.notes?.length)
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No notes yet</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Start your journey by creating your first note.
        </p>
        <button
          onClick={() => {
            setEditNoteId(null);
            setDialogOpen(true);
          }}
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Your First Note
        </button>

        {isDialogOpen && (
          <CreateNoteDialog
            form={form}
            setForm={setForm}
            isSubmitting={isSubmitting}
            onClose={() => setDialogOpen(false)}
            onSubmit={editNoteId ? handleUpdateNote : handleCreateNote}
          />
        )}
      </div>
    );

  // Notes grid
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Notes</h2>
        <button
          onClick={() => {
            setEditNoteId(null);
            setDialogOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <Plus className="w-4 h-4" /> New Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.notes.map((note: Note) => (
          <div
            key={note.id}
            className="group bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-6 pb-4 border-b border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1">
                    {note.title}
                  </h3>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-blue-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 pt-4">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {note.content.substring(0, 150)}
                {note.content.length > 150 ? "..." : ""}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created{" "}
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    Updated{" "}
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-blue-100">
                <button
                  onClick={() => handleEditNote(note)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="flex items-center justify-center px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold rounded-xl transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <CreateNoteDialog
          form={form}
          setForm={setForm}
          isSubmitting={isSubmitting}
          onClose={() => setDialogOpen(false)}
          onSubmit={editNoteId ? handleUpdateNote : handleCreateNote}
        />
      )}
    </div>
  );
}
