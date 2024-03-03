import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseConfig";

function FileUpload() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("smoothie-storage")
        .list("upload", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        console.log(error);
      }

      if (data) {
        setMedia(data);
      }
    };

    fetchImages();
  }, []); // Only runs on initial mount

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file.name);

    const { data, error } = await supabase.storage
      .from("smoothie-storage")
      .upload("upload/" + file.name, file);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      // After successful upload, refetch images
      fetchImages();
    }
  };

  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from("smoothie-storage")
      .list("upload", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.log(error);
    }

    if (data) {
      setMedia(data);
    }
  };

  return (
    <>
      <h2>FileUpload</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileUpload(e)}
      />
      <div>
        {media.map((single_file) => {
          return (
            <img
              key={single_file.id}
              src={`https://aojeagofjkdkxhzonxfq.supabase.co/storage/v1/object/public/smoothie-storage/upload/${single_file.name}`}
              alt=""
            />
          );
        })}
      </div>
    </>
  );
}

export default FileUpload;
