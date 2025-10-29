import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type CreateNoteForm = { title: string; content: string };

type CreateNoteDialogProps = {
  form: CreateNoteForm;
  setForm: Dispatch<SetStateAction<CreateNoteForm>>;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export default function CreateNoteDialog({
  form,
  setForm,
  onClose,
  onSubmit,
  isSubmitting,
}: CreateNoteDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Note
        </h2>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter title"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Write your note..."
          rows={5}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}
