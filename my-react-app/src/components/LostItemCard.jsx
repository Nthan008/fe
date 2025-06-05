import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function LostItemCard({
  title,
  date,
  description = [],
  labels = [],
  hideButton = false,
  className = "",
  claimedDate = "Not claimed",
  location = "Unknown",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClaimItem = () => {
    navigate("/request-meeting", { state: { title, date, description, labels } });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  // Determine styles based on the current route
  const isRequestMeetingPage = currentLocation.pathname === "/request-meeting";
  const cardBackgroundColor = isRequestMeetingPage ? "bg-[#C8E3FF]" : "bg-blue-900";
  const textColor = isRequestMeetingPage ? "text-[#04004E]" : "text-white";
  const labelBorderWidth = isRequestMeetingPage ? "border-2" : "border";

  return (
    <>
      {/* Card */}
      <div className={`${cardBackgroundColor} ${textColor} p-6 rounded-2xl shadow-lg w-full ${className}`}>
        {/* Labels */}
        <div className="flex flex-wrap gap-2 mb-1">
          {labels.map((label, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${labelBorderWidth} ${
                label === "Active"
                  ? "border-[#0FAB00] bg-[#A7FFC3] text-[#005D0E]"
                  : label === "Electronic" || label === "Book"
                  ? "border-[#903A00] bg-[#FFC285] text-[#005D0E]"
                  : "bg-orange-400 text-black"
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>

        <p className="flex items-center text-sm mb-3">
          <FaCalendarAlt className="mr-2" />
          Date Reported: <strong className="ml-1">{date || "Unknown"}</strong>
        </p>

        {/* Date Claimed */}
        {(isRequestMeetingPage || claimedDate !== "Not claimed") && (
          <p className="flex items-center text-sm mb-3">
            <FaCalendarAlt className="mr-2" />
            Date Claimed: <strong className="ml-1">{claimedDate}</strong>
          </p>
        )}

        {/* Location Found */}
        {isRequestMeetingPage && (
          <p className="flex items-center text-sm mb-3">
            <svg className="inline mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C6.14 0 3 3.14 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S8.62 4.5 10 4.5s2.5 1.12 2.5 2.5S11.38 9.5 10 9.5z" />
            </svg>
            Location Found: <strong className="ml-1">{location}</strong>
          </p>
        )}

        <p className="flex items-center text-sm mb-2">
          <FaInfoCircle className="mr-2" /> Descriptions:
        </p>
        <ul className="list-disc list-inside text-sm ml-3">
          {description.length > 0 ? (
            description.map((desc, index) => (
              <li key={index} className="font-semibold">
                {desc}
              </li>
            ))
          ) : (
            <li className="text-gray-300">No description available</li>
          )}
        </ul>

        {!hideButton && (
          <button
            onClick={openModal}
            className="text-blue-300 text-sm font-semibold mt-4 block hover:underline ml-auto"
          >
            See Detail
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(59,130,246,0.5)]">
          <div
            ref={modalRef}
            className="bg-[#C8E3FF] text-[#04004E] p-8 rounded-2xl shadow-xl w-full max-w-md relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-black font-bold text-xl"
            >
              &times;
            </button>

            <div className="flex flex-col space-y-4">
              {/* Labels */}
              <div className="flex flex-wrap gap-2 mb-4">
                {labels.map((label, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${labelBorderWidth} ${
                      label === "Active"
                        ? "border-[#0FAB00] bg-[#A7FFC3] text-[#005D0E]"
                        : label === "Electronic" || label === "Book"
                        ? "border-[#903A00] bg-[#FFC285] text-[#005D0E]"
                        : "bg-orange-400 text-black"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2">{title}</h3>

              <p className="text-sm">
                <FaCalendarAlt className="inline mr-2" />
                <span className="font-normal">Date Reported:</span>{" "}
                <strong>{date || "Unknown"}</strong>
              </p>

              <p className="text-sm">
                <FaCalendarAlt className="inline mr-2" />
                <span className="font-normal">Date Claimed:</span>{" "}
                <strong>{claimedDate}</strong>
              </p>

              <p className="text-sm">
                <svg className="inline mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C6.14 0 3 3.14 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S8.62 4.5 10 4.5s2.5 1.12-2.5 2.5S11.38 9.5 10 9.5z" />
                </svg>
                <span className="font-normal">Location Found:</span>{" "}
                <strong>{location}</strong>
              </p>

              <div>
                <p className="text-sm font-semibold mb-2 text-[#04004E]">
                  <FaInfoCircle className="inline mr-2" />
                  Description:
                </p>
                <ul className="list-disc list-inside ml-4 text-[#04004E] font-semibold">
                  {description.length > 0 ? (
                    description.map((desc, index) => (
                      <li key={index} className="text-sm">
                        {desc}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 font-normal">No description available</li>
                  )}
                </ul>
              </div>

              <button
                onClick={handleClaimItem}
                className="bg-green-400 hover:bg-green-500 text-white px-5 py-2 rounded-full font-semibold w-fit self-end"
              >
                Claim this item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
