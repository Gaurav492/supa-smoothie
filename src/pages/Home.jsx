import { useEffect, useState } from "react";
import supabase from "../config/supabaseConfig";
import SmoothieCard from "../components/SmoothieCard";

function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setFetchError("Could not fetch the error");
        console.error(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <>
      <div className="page home">
        {fetchError && <p className="error">{fetchError}</p>}
        {smoothies && (
          <div className="smoothies">
            <div className="smoothie-grid">
              {smoothies.map((smoothie) => (
                <SmoothieCard key={smoothie.id} smoothie={smoothie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
