import React from "react";
import LostItemCard from "../components/LostItemCard";

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

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow pt-24 px-6 w-full pb-32"> 
        <h1 className="text-2xl font-bold mb-2">Request Meeting For Lost Item</h1>
        <p className="text-sm text-gray-600 mb-6">
          Please request a meeting with our staff before claiming the lost item
        </p>

        <section className="mb-10">
          <h2 className="text-base font-semibold mb-2">Item Info</h2>
          <div className="w-full">
            <LostItemCard {...item} hideButton className="h-auto" /> 
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-3">Request Meeting Form</h2>
          <form className="space-y-5 w-full max-w-3xl">
            <div>
              <label className="block text-sm font-medium mb-1">Meeting Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meeting Time</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meeting Location</label>
              <input
                type="text"
                placeholder="e.g., JWC Lobby, Room 101"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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
