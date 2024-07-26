import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import RetreatCard from "../components/RetreatCard";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const HomePage = () => {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  useEffect(() => {
    fetchRetreats();
  }, []);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredRetreats.length / itemsPerPage);
    setTotalPages(newTotalPages);
    setCurrentPage(1); // Reset to first page on filter change
  }, [filteredRetreats]);

  useEffect(() => {
    // Ensure current page is valid after filtering or pagination
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const fetchRetreats = async () => {
    try {
      const response = await axios.get(
        "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
      );
      setRetreats(response.data);
      setFilteredRetreats(response.data);
    } catch (error) {
      console.error("Failed to fetch retreats", error);
    }
  };

  const handleDateChange = (date) => {
    // Implement date filter logic
  };

  const handleTypeChange = (type) => {
    let filtered;
    switch (type) {
      case "Yoga":
        filtered = retreats.filter((retreat) => retreat.tag.includes("yoga"));
        break;
      case "Meditation":
        filtered = retreats.filter((retreat) =>
          retreat.tag.includes("meditation")
        );
        break;
      case "Detox":
        filtered = retreats.filter((retreat) => retreat.tag.includes("diet"));
        break;
      default:
        filtered = retreats;
    }
    setFilteredRetreats(filtered);
    // No need to call setTotalPages here as useEffect handles it
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the retreat cards to display based on current page
  const displayedRetreats = filteredRetreats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Header />
      <div className="search-tool">
        <Filter
          onDateChange={handleDateChange}
          onTypeChange={handleTypeChange}
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="retreat-list">
        {displayedRetreats.length > 0 ? (
          displayedRetreats.map((retreat) => (
            <RetreatCard key={retreat.id} retreat={retreat} />
          ))
        ) : (
          <p>No retreats available</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
