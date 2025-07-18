import { useEffect, useState } from "react";
import { supabase } from "../client";
import Card from "../components/Card";

export default function ShowCreators() {
  const [creators, setCreators] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreators();
  }, []);

  async function getCreators() {
    const { data: creators } = await supabase.from("creators").select("*");
    setCreators(creators);
    setLoading(false);
  }

  return (
    <div className="main-content">
      {loading ? (
        <p>Loading...</p>
      ) : creators && creators.length > 0 ? (
        <div className="content-display">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <h2 id="no-creators" style={{ color: "#65aded" }}>
          NO CREATORS YET 😞
        </h2>
      )}
    </div>
  );
}
