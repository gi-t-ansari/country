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

const inputContainer = {
  display: "flex",
  justifyContent: "center",
  padding: "10px 20px"
};

const inputStyle = {
  padding: "10px 5px",
  width: "300px",
  border: "1px solid #000",
  borderRadius: "7px"
};

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getCountryName = (e) => {
    setSearchedCountry(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchedCountry.toLowerCase())
  );

  return (
    <div>
      <div style={inputContainer}>
        <input
          type="text"
          placeholder="Search for Countries"
          style={inputStyle}
          onChange={getCountryName}
        />
      </div>
      <div style={containerStyle}>
        {filteredCountries.map((country) => (
          <div key={country.common} style={cardStyle} className="countryCard">
            <img src={country.png} alt={country.common} style={imageStyle} />
            <h2>{country.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;
