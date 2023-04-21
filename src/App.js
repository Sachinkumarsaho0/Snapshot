import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountain");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "2257b5dbc4a56f38286779f397de39dd",
      text: searchText,
      sort: "",
      per_page: 42,
      license: "4",
      extras: "owner_name , license",
      format: "json",
      nojsoncallback: 1,
    };
    const parameters = new URLSearchParams(params);
    const url = `http://api.flickr.com/services/rest/?${parameters}`;
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data);
        const arr = resp.data.photos.photo.map((imgData) => {
          return fetchFlickerImageUrl(imgData, "q");
        });
        setImageData(arr);
      })

      .catch(() => {})
      .finally(() => {});
  }, [searchText]);

  const fetchFlickerImageUrl = (photo, size) => {
    let url = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (size) {
      url += `_${size}`;
    }
    url += `.jpg`;
    return url;
  };
  return (
    <div className="App">
      <input
        onChange={(e) => {
          searchData.current = e.target.value;
        }}
      />
      <button
        onClick={() => {
          setSearchText(searchData.current);
        }}
      >
        Search
      </button>
      <section className="button">
        <button
          onClick={() => {
            setSearchText("mountains");
          }}
        >
          Mountains
        </button>
        <button
          onClick={() => {
            setSearchText("beaches");
          }}
        >
          Beaches
        </button>
        <button
          onClick={() => {
            setSearchText("birds");
          }}
        >
          Birds
        </button>
        <button
          onClick={() => {
            setSearchText("food");
          }}
        >
          Food
        </button>
      </section>
      <section className="image">
        {imageData.map((imageurl, key) => {
          return (
            <article>
              {" "}
              <img src={imageurl} key={key} />;{" "}
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default App;
