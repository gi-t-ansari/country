import React, { useEffect, useState } from "react";

const cardStyle = {
  width: "200px",
  border: "1px solid #000",
  borderRadius: "10px",
  margin: "10px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center"
};

const imageStyle = {
  width: "150px",
  height: "100px"
};

function Countries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // async function fetchAPI() {}
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div style={containerStyle}>
      {countries.map((country) => (
        <div key={country.abbr} style={cardStyle}>
          <img src={country.flag} alt={country.abbr} style={imageStyle} />
          <h2>{country.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Countries;
