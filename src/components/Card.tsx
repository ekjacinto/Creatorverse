import { Link } from "react-router";
import { useState } from "react";
import { FaInstagram, FaPen, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

interface CardProps {
  creator: {
    id: number;
    name: string;
    description: string;
    imageURL: string;
    youtube_handle: string;
    twitter_handle: string;
    instagram_handle: string;
  };
}

export default function Card({ creator }: CardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="card-container"
      style={{
        backgroundImage: `url(${creator.imageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onError={handleImageError}
    >
      <div className="card-overlay">
        <div className="card-header">
          <Link to={{ pathname: `/creator/${creator.id}` }}>
            <h1>{creator.name.toUpperCase()}</h1>
          </Link>
          <div className="social-icons">
            <Link to={{ pathname: `/edit/${creator.id}` }}>
              <FaPen color="white" />
            </Link>
            <Link to={{ pathname: `/creator/${creator.id}` }}>
              <FaCircleInfo color="white" />
            </Link>
          </div>
        </div>

        <div className="social-icons">
          {creator.youtube_handle && (
            <Link
              to={`https://youtube.com/@${creator.youtube_handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube color="white" className="social-icon" />
            </Link>
          )}
          {creator.twitter_handle && (
            <Link
              to={`https://twitter.com/${creator.twitter_handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter color="white" className="social-icon" />
            </Link>
          )}
          {creator.instagram_handle && (
            <Link
              to={`https://instagram.com/${creator.instagram_handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram color="white" className="social-icon" />
            </Link>
          )}
        </div>

        <p id="creator-description">{creator.description}</p>
      </div>
      {imageError && (
        <div className="image-placeholder">
          <span>📷</span>
          <p>Image not available</p>
        </div>
      )}
    </div>
  );
}
