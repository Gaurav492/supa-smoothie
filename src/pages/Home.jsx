import { useEffect, useState } from "react";
import supabase from "../config/supabaseConfig";
import SmoothieCard from "../components/SmoothieCard";

function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id != id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      // QUERY TO FETCH ALL THE RECORDS
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

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
  }, [orderBy]);

  return (
    <>
      <div className="page home">
        {fetchError && <p className="error">{fetchError}</p>}
        {smoothies && (
          <div className="smoothies">
            <div className="order-by">
              <p>Order by:</p>
              <button onClick={() => setOrderBy("created_at")}>
                Time Created
              </button>
              <button onClick={() => setOrderBy("title")}>Title</button>
              <button onClick={() => setOrderBy("rating")}>Rating</button>
              {orderBy}
            </div>
            <div className="smoothie-grid">
              {smoothies.map((smoothie) => (
                <SmoothieCard
                  key={smoothie.id}
                  smoothie={smoothie}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
