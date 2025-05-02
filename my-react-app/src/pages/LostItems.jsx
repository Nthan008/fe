import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import LostItemCard from "../components/LostItemCard";

const categories = ["Electronic", "Peripheral", "Student tools", "Book", "Other"];
const itemsPerPage = 8;

const dummyData = Array.from({ length: 20 }).map((_, i) => ({
  title: `Item ${i + 1} - ${i % 2 === 0 ? "Iphone 14" : "Laptop Asus"}`,
  date: "December 21, 2024",
  claimedDate: i % 3 === 0 ? "January 10, 2025" : "-", // some claimed, some not
  location: i % 2 === 0 ? "Library" : "Cafeteria",
  labels: ["Active", i % 2 === 0 ? "Electronic" : "Book"],
  description: [
    "Casing color: Indigo",
    "Casing pattern: Batik motif",
    "Base color of the gadget: Gray"
  ]
}));
  

export default function LostItemsPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);

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

  const filteredData = dummyData.filter((item) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      item.labels.some((label) => selectedCategories.includes(label));
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.some((desc) =>
        desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-1">List of Lost Items</h2>
        <p className="text-sm text-gray-600 mb-6">Check your lost item here...</p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search item here..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to page 1 on search
              }}
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

          {/* Filter by Period (placeholder) */}
          <button className="border border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
            Filter by Period
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <LostItemCard key={index} {...item} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No items found for selected filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center space-x-2 text-sm font-medium flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "text-gray-400" : "text-blue-900"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-500 text-white"
                  : "text-blue-900"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? "text-gray-400" : "text-blue-900"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
