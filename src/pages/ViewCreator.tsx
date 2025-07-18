import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import DeletePopup from "../components/DeletePopup";

interface CreatorProps {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  youtube_handle: string;
  twitter_handle: string;
  instagram_handle: string;
}

export default function ViewCreator() {
  const [creator, setCreator] = useState<CreatorProps>();
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  let params = useParams();

  useEffect(() => {
    getCreator();
  }, []);

  async function getCreator() {
    const { data: creator } = await supabase
      .from("creators")
      .select("*")
      .eq("id", params.id)
      .single();

    if (creator) {
      setCreator(creator);
    }
  }

  return (
    <div className="view-creator-content">
      <div id="creator-image-container">
        <img src={creator?.imageURL} alt={creator?.name} />
      </div>
      <div id="creator-info-container">
        <h2>{creator?.name.toUpperCase()}</h2>
        <p>{creator?.description}</p>
        <div className="social-icons">
          {creator?.youtube_handle && (
            <Link
              to={`https://youtube.com/@${creator.youtube_handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube color="white" className="social-icon" />
            </Link>
          )}
          {creator?.twitter_handle && (
            <Link
              to={`https://twitter.com/${creator.twitter_handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter color="white" className="social-icon" />
            </Link>
          )}
          {creator?.instagram_handle && (
            <Link
              to={`https://instagram.com/${creator.instagram_handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram color="white" className="social-icon" />
            </Link>
          )}
        </div>
        <div className="action-buttons">
          <Link to={`/edit/${creator?.id}`}>
            <button>EDIT</button>
          </Link>
          <button
            type="button"
            id="delete"
            onClick={() => setDeletePopup(!deletePopup)}
          >
            DELETE
          </button>
        </div>
        {deletePopup && creator && (
          <DeletePopup
            creator={creator}
            onClose={() => setDeletePopup(false)}
          />
        )}
      </div>
    </div>
  );
}
