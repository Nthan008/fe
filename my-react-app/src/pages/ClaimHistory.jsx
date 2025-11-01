import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import LostItemCard from "../components/LostItemCard";

const periodOptions = [
  { label: "Filter by Period", value: "", disabled: true }, // placeholder
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Past 3 Days", value: "past3days" },
  { label: "Past Week", value: "pastweek" },
  { label: "Past Month", value: "pastmonth" },
  { label: "Past Year", value: "pastyear" },
];

const categories = ["Electronic", "Peripheral", "Student tools", "Book", "Other"];

function parseDate(dateStr) {
  // Assumes format: "Month DD, YYYY"
  return new Date(dateStr);
}

function isWithinPeriod(itemDate, period) {
  if (!itemDate || itemDate === "-") return false;
  const now = new Date();
  const date = parseDate(itemDate);
  const diffTime = now - date;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  switch (period) {
    case "today":
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    case "yesterday":
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      );
    case "past3days":
      return diffDays <= 3;
    case "pastweek":
      return diffDays <= 7;
    case "pastmonth":
      return diffDays <= 31;
    case "pastyear":
      return diffDays <= 366;
    case "all":
    default:
      return true;
  }
}

export default function ClaimHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const dropdownRef = useRef(null);

  // Dummy data for demonstration
  const claimedItems = [
    {
      title: "Iphone 14",
      date: "December 21, 2024",
      claimedDate: "January 3, 2025",
      location: "Campus Library",
      labels: ["Electronic", "Active"],
      description: [
        "Casing color: Indigo",
        "Casing pattern: Batik motif",
        "Base color of the gadget: Gray",
      ],
    },
    {
      title: "Physics Textbook",
      date: "November 10, 2024",
      claimedDate: "December 5, 2024",
      location: "Building C, 2nd Floor",
      labels: ["Book"],
      description: ["Blue hard cover", "Some highlighted pages"],
    },
    {
      title: "Wallet",
      date: "October 2, 2024",
      claimedDate: "October 10, 2024",
      location: "Cafeteria",
      labels: ["Active"],
      description: ["Brown leather", "Contains student ID"],
    },
    {
      title: "Umbrella",
      date: "September 15, 2024",
      claimedDate: "September 20, 2024",
      location: "Parking Lot",
      labels: ["Active"],
      description: ["Black, foldable", "Brand: ABC"],
    },
    {
      title: "Water Bottle",
      date: "August 8, 2024",
      claimedDate: "August 12, 2024",
      location: "Gym",
      labels: ["Active"],
      description: ["Blue stainless steel", "Sticker: 'Stay Hydrated'"],
    },
    // Add more dummy data if needed
  ];

  // Category filter logic
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const toggleDropdown = () => setShowCategoryFilter((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  const filteredItems = claimedItems.filter((item) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      item.labels.some((label) => selectedCategories.includes(label));
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.some((desc) =>
        desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesPeriod =
      !selectedPeriod || selectedPeriod === "" || selectedPeriod === "all"
        ? true
        : isWithinPeriod(item.claimedDate, selectedPeriod);
    return matchesCategory && matchesSearch && matchesPeriod;
  });

  // Pagination logic replaced with "Load More"
  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [searchTerm, selectedPeriod, selectedCategories]);

  const paginatedItems = filteredItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  return (
    <div className="bg-white min-h-screen px-6 pt-24 pb-16">
      <h1 className="text-2xl font-bold text-[#030069] mb-2">Claim History</h1>
      <p className="text-sm text-[#030069] mb-6">
        Below is a list of items you have successfully claimed.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search item here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 px-4 text-sm"
          />
          <FaSearch className="absolute top-2.5 right-4 text-gray-500" />
        </div>

        {/* Filter by Category */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-700"
          >
            Filter by Category
          </button>

          {showCategoryFilter && (
            <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 text-sm">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="mr-2"
                  />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter by Period */}
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-700"
        >
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <LostItemCard
              key={index}
              title={item.title}
              date={item.date}
              claimedDate={item.claimedDate}
              location={item.location}
              labels={item.labels}
              description={item.description}
              hideButton={true}
              className="bg-[#C8E3FF] text-[#04004E]"
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">You have no claimed items yet.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredItems.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
