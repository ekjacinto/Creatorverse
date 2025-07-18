import { useState } from "react"
import { supabase } from "../client"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router";

interface InputProps {
  name: string;
  description: string;
  image: string;
  youtubeHandle: string;
  twitterHandle: string;
  instagramHandle: string;
}

export default function AddCreator() {
  const [inputs, setInputs] = useState<InputProps>({
    name: '',
    description: '',
    image: '',
    youtubeHandle: '',
    twitterHandle: '',
    instagramHandle: '',
  });

  const navigate =  useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const { error } = await supabase
        .from("creators")
        .insert({
          name: inputs.name,
          description: inputs.description,
          imageURL: inputs.image,
          youtube_handle: inputs.youtubeHandle,
          twitter_handle: inputs.twitterHandle,
          instagram_handle: inputs.instagramHandle,
        });

      if (error) {
        console.error('Error inserting creator:', error);
        alert('Error adding creator. Please try again.');
      } else {
        alert('Creator added successfully!');
        // Reset form
        setInputs({
          name: '',
          description: '',
          image: '',
          youtubeHandle: '',
          twitterHandle: '',
          instagramHandle: '',
        });

        navigate("/");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding creator. Please try again.');
    }
  }

  return (
    <form className="creator-form" onSubmit={handleSubmit}>
      <label className="form-label">
        <p className="input-label">Name</p>
        <input name="name" value={inputs.name} type="text" onChange={handleChange} required />
      </label>

      <label className="form-label">
        <p className="input-label">Image</p>
        <p>
          Provide a link to an image of your creator. Be sure to include the http://  
        </p>
        <input name="image" value={inputs.image} type="text" onChange={handleChange} required />
      </label>

      <label className="form-label">
        <p className="input-label">Description</p>
        <p>
          Provide a description of the creator. Who are they? What makes them interesting?
        </p>
        <textarea 
          style={{ height: "20vh" }} 
          name="description" 
          value={inputs.description} 
          onChange={handleChange} 
          maxLength={250}
          required 
        />
        <p className="char-counter">{inputs.description.length}/250 characters</p>
      </label>

      <label className="form-label">
        <p id="sm-break" style={{ color:  "#5185b4" }}>SOCIAL MEDIA LINKS</p>
        <p>
          Provide at least one of the creator's social media links.
        </p>
      </label>

      <label className="form-label">
        <div style={{ display: "flex",  alignItems: "end", gap: "5px" }}>
          <FaYoutube size={30} color="white" />
          <p className="input-label">YouTube</p>
        </div>
        <p>
          The creator's YouTube handle (without the @)        
        </p>
        <input name="youtubeHandle" value={inputs.youtubeHandle} type="text" onChange={handleChange} required />
      </label>
      
      <label className="form-label">
        <div style={{ display: "flex",  alignItems: "end", gap: "5px" }}>
          <FaTwitter size={30} color="white" />
          <p className="input-label">Twitter</p>
        </div>
        <p>
          The creator's Twitter handle (without the @)        
        </p>
        <input name="twitterHandle" value={inputs.twitterHandle} type="text" onChange={handleChange} required />
      </label>

      <label className="form-label">
        <div style={{ display: "flex",  alignItems: "end", gap: "5px" }}>
          <FaInstagram size={30} color="white" />
          <p className="input-label">Instagram</p>
        </div>
        <p>
          The creator's Instagram handle (without the @)        
        </p>
        <input name="instagramHandle" value={inputs.instagramHandle} type="text" onChange={handleChange} required />
      </label>
      
      <button type="submit">SUBMIT</button>
    </form>
  )
}
