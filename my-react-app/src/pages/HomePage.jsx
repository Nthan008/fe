import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LostItemCard from "../components/LostItemCard";
import TeamCard from "../components/TeamMemberCard";
import heroImg from "../assets/heroImg.png";

export default function HomePage() {
  const teamSectionRef = useRef(null); // Create a ref for the "Our Team" section
  const location = useLocation();

  useEffect(() => {
    // Check if we need to scroll to the "Our Team" section
    if (location.state?.scrollToTeam && teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // Sample data for lost items
  const lostItems = [
    {
      title: "Iphone 14",
      date: "December 21, 2024",
      description: [
        "Casing color: Indigo",
        "Casing pattern: Batik motif",
        "Base color of the gadget: Gray",
      ],
      labels: ["Active", "Electronic"],
    },
    {
      title: "Iphone 14",
      date: "December 21, 2024",
      description: [
        "Casing color: Indigo",
        "Casing pattern: Batik motif",
        "Base color of the gadget: Gray",
      ],
      labels: ["Active", "Electronic"],
    },
    {
      title: "Iphone 14",
      date: "December 21, 2024",
      description: [
        "Casing color: Indigo",
        "Casing pattern: Batik motif",
        "Base color of the gadget: Gray",
      ],
      labels: ["Active", "Electronic"],
    },
    {
      title: "Iphone 14",
      date: "December 21, 2024",
      description: [
        "Casing color: Indigo",
        "Casing pattern: Batik motif",
        "Base color of the gadget: Gray",
      ],
      labels: ["Active", "Electronic"],
    },
  ];

  // Sample data for team members
  const teamMembers = [
    {
      name: "Juwono",
      username: "uno_136",
      github: "Juwono136",
    },
    {
      name: "Juwono",
      username: "uno_136",
      github: "Juwono136",
    },
    {
      name: "Juwono",
      username: "uno_136",
      github: "Juwono136",
    },
    {
      name: "Juwono",
      username: "uno_136",
      github: "Juwono136",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="pt-24 py-16 px-4 flex flex-col md:flex-row items-center justify-between"
        style={{ backgroundColor: "#9EE7FF" }}
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={heroImg} alt="Lost and Found Hero" className="w-full max-w-md mx-auto" />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-lg font-semibold" style={{ color: "#003874" }}>
            Binus University International
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4" style={{ color: "#003874" }}>
            Did you lose something around campus?
          </h2>
          <p className="text-base md:text-lg" style={{ color: "#003874" }}>
            Don’t worry, try looking for your item here...
          </p>
        </div>
      </section>

      {/* Recent Lost Items */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-center text-2xl font-bold mb-6" style={{ color: "#003874" }}>
          Recent Lost Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {lostItems.map((item, index) => (
            <LostItemCard
              key={index}
              title={item.title}
              date={item.date}
              description={item.description}
              labels={item.labels}
            />
          ))}
        </div>
        <p className="text-center mt-6">
          <a href="lostitem" className="font-semibold hover:underline" style={{ color: "#003874" }}>
            See More
          </a>
        </p>
      </section>

      {/* Our Team Section */}
      <section ref={teamSectionRef} className="bg-yellow-200 py-12">
        <h2 className="text-center text-2xl font-bold mb-10" style={{ color: "#003874" }}>
          Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              username={member.username}
              github={member.github}
              className="w-full sm:w-auto mx-auto"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
