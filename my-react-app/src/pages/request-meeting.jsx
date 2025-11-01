import React, { useState } from "react";
import LostItemCard from "../components/LostItemCard";
import Datepicker from "tailwind-datepicker-react";
import toast from "react-hot-toast"; // Add this if you use hottoast

export default function RequestMeeting() {
  const item = {
    title: "Iphone 14",
    date: "December 21, 2024",
    labels: ["Active", "Electronic"],
    description: [
      "Casing color: Indigo",
      "Casing pattern: Batik motif",
      "Base color of the gadget: Gray",
    ],
  };

  // Generate time slots with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Start at 10:00

    while (currentTime.getHours() < 17 || (currentTime.getHours() === 17 && currentTime.getMinutes() === 0)) {
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by 30 minutes
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // State for the date picker
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const day = new Date(date).getDay();
      if (day === 0 || day === 6) {
        toast.error("Meetings cannot be scheduled on Saturday or Sunday.");
        setSelectedDate(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if date is selected and not a weekend
    if (!selectedDate) {
      toast.error("Please select a meeting date.");
      return;
    }
    const day = new Date(selectedDate).getDay();
    if (day === 0 || day === 6) {
      toast.error("Meetings cannot be scheduled on Saturday or Sunday.");
      return;
    }

    // ...add your other validations and submit logic here...
    toast.success("Meeting requested!");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow pt-24 px-6 w-full pb-32">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#030069" }}>
          Request Meeting For Lost Item
        </h1>
        <p className="text-sm mb-6" style={{ color: "#030069" }}>
          Please request a meeting with our staff before claiming the lost item
        </p>

        <section className="mb-10">
          <h2 className="text-base font-semibold mb-2" style={{ color: "#030069" }}>
            Item Info
          </h2>
          <div className="w-full">
            <LostItemCard {...item} hideButton className="h-auto" />
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3" style={{ color: "#030069" }}>
            Request Meeting Form
          </h2>
          <form className="space-y-5 w-full max-w-3xl" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#030069" }}>
                Meeting Date
              </label>
              <Datepicker
                options={{
                  autoHide: true,
                  todayBtn: true,
                  clearBtn: true,
                  format: "MMM dd, yyyy",
                  theme: {
                    background: "bg-white",
                    todayBtn: "bg-[#030069] hover:bg-[#0500a3] text-white font-semibold py-1 px-3 rounded-md",
                    clearBtn: "bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-3 rounded-md",
                    icons: "text-[#030069]",
                    text: "text-[#030069]",
                    disabledText: "text-gray-400",
                    input: "border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#030069] p-2",
                    inputIcon: "text-[#030069]",
                    selected: "bg-[#030069] text-white",
                    calendar: "grid grid-cols-7 gap-1 text-center p-4 shadow-lg border border-[#030069] rounded-lg",
                  },
                  // Disable Saturday (6) and Sunday (0)
                  disabledDates: [
                    {
                      repeat: "weekly",
                      daysOfWeek: [0, 6],
                    },
                  ],
                }}
                show={showDatepicker}
                setShow={setShowDatepicker}
                onChange={handleDateChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#030069" }}>
                Meeting Time
              </label>
              <div className="grid grid-cols-5 gap-4">
                {timeSlots.map((time, index) => (
                  <label
                    key={index}
                    className={`p-2 border border-gray-300 rounded-md text-center cursor-pointer hover:bg-blue-100
                      ${selectedTime === time ? "bg-blue-600 text-white border-blue-600 font-bold" : ""}
                    `}
                    onClick={() => setSelectedTime(time)}
                  >
                    <input
                      type="radio"
                      name="meetingTime"
                      value={time}
                      checked={selectedTime === time}
                      onChange={() => setSelectedTime(time)}
                      className="hidden"
                    />
                    <span className="text-sm font-medium">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "#030069" }}>
                Meeting Location
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#030069]"
              >
                <option value="JWC Campus">JWC Campus</option>
                <option value="FX Sudirman Campus">FX Sudirman Campus</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md"
              >
                Create Meeting
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
