import React, { useEffect, useState } from "react";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // Ensure full list is shown initially
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (!searchedCountry.trim()) {
      setFilteredCountries(countries); // Reset to full list when input is cleared
    } else {
      const filtered = countries.filter((country) =>
        country.common
          .toLowerCase()
          .includes(searchedCountry.trim().toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchedCountry, countries]);

  return (
    <div>
      {/* Search Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 20px",
        }}
      >
        <input
          type="text"
          placeholder="Search for Countries"
          style={{
            padding: "10px 5px",
            width: "300px",
            border: "1px solid #000",
            borderRadius: "7px",
            boxShadow: "2.5px 2.5px 5px slategray",
          }}
          onChange={(e) => setSearchedCountry(e.target.value)}
          value={searchedCountry}
        />
      </div>

      {/* Display Countries */}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {filteredCountries.map((country) => (
          <div
            key={country.common}
            className="country-card"
            style={{
              width: "200px",
              borderRadius: "10px",
              margin: "10px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2.5px 2.5px 5px slategray",
              backgroundColor: "#64748b",
              color: "#fff",
            }}
          >
            <img
              src={country.png}
              alt={country.common}
              style={{ width: "150px", height: "100px" }}
            />
            <h2>{country.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countries;
