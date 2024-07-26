import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import RetreatCard from "../components/RetreatCard";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const HomePage = () => {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3; 

  useEffect(() => {
    fetchRetreats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [retreats, searchQuery, currentPage]);

  const fetchRetreats = async () => {
    try {
      const response = await axios.get(
        "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
      );
      setRetreats(response.data);
      applyFilters(response.data);
    } catch (error) {
      console.error("Failed to fetch retreats", error);
    }
  };

  const applyFilters = (retreatsToFilter = retreats) => {

    const searchFiltered = retreatsToFilter.filter((retreat) =>
      retreat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFiltered = searchFiltered.slice(startIndex, endIndex);

    setFilteredRetreats(paginatedFiltered);
    setTotalPages(Math.ceil(searchFiltered.length / itemsPerPage));
  };

  const handleDateChange = (dateRange) => {
    let filteredByDate;
    const now = new Date();
    let startYear, endYear;

    switch (dateRange) {
      case "2023-2024":
        startYear = 2023;
        endYear = 2024;
        break;
      case "2024-2025":
        startYear = 2024;
        endYear = 2025;
        break;
      default:
        filteredByDate = retreats;
        break;
    }

    if (startYear && endYear) {
      const startTimestamp = new Date(startYear, 0, 1).getTime() / 1000;
      const endTimestamp = new Date(endYear, 0, 1).getTime() / 1000;

      filteredByDate = retreats.filter((retreat) => {
        const retreatDate = retreat.date;
        return retreatDate >= startTimestamp && retreatDate < endTimestamp;
      });
    }

    applyFilters(filteredByDate);
  };

  const handleTypeChange = (type) => {
    let filteredByType;

    switch (type) {
      case "Yoga":
        filteredByType = retreats.filter((retreat) =>
          retreat.tag.includes("yoga")
        );
        break;
      case "Meditation":
        filteredByType = retreats.filter((retreat) =>
          retreat.tag.includes("meditation")
        );
        break;
      case "Detox":
        filteredByType = retreats.filter((retreat) =>
          retreat.tag.includes("diet")
        );
        break;
      default:
        filteredByType = retreats;
        break;
    }

    applyFilters(filteredByType);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters();
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

  return (
    <div>
      <Header />
      <Hero />
      <div className="search-tool">
        <Filter
          onDateChange={handleDateChange}
          onTypeChange={handleTypeChange}
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="retreat-list">
        {filteredRetreats.length > 0 ? (
          filteredRetreats.map((retreat) => (
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
