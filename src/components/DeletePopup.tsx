import { useNavigate } from "react-router";
import { supabase } from "../client";

interface CreatorProps {
  creator: {
    id: number;
    name: string;
  };
  onClose: () => void;
}

export default function DeletePopup({ creator, onClose }: CreatorProps) {
  const navigate = useNavigate();

  async function handleDelete() {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", creator.id);

    if (error) {
      console.error("Error deleting creator:", error);
      alert("Error deleting creator. Please try again.");
    } else {
      alert("Creator deleted successfully!");
      navigate("/");
    }
  }

  return (
    <div className="delete-popup">
      <div className="delete-popup-overlay">
        <div className="close-button" onClick={onClose}>
          ✕
        </div>
        <h2>⚠️ WAIT!!!! ⚠️</h2>
        <p>Are you sure you want to delete {creator.name}</p>

        <button
          type="button"
          style={{ width: "20rem" }}
          onClick={() => navigate("/")}
        >
          NAH, NEVER MIND
        </button>
        <button
          type="button"
          id="delete"
          style={{ width: "20rem" }}
          onClick={handleDelete}
        >
          YES! TOTALLY SURE
        </button>
      </div>
    </div>
  );
}
