import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

export default function UserDashboard() {
  const { userName } = useContext(AuthContext);

  // Dummy stats
  const stats = [
    { label: "Total Claim", value: 15, change: "+2 this week" },
    { label: "Total Item Founded", value: 42, change: "+5 this week" },
    { label: "Total Request Meeting", value: 8, change: "+1 this week" },
  ];

  // Dummy weekly activity data
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const claims = [12, 17, 8, 14, 25, 19, 10];
  const founds = [7, 14, 6, 13, 21, 16, 8];

  // Dummy categories
  const categories = [
    { label: "Electronics", color: "#3B82F6", value: 18 },
    { label: "Books", color: "#22C55E", value: 12 },
    { label: "Clothing", color: "#F59E42", value: 7 },
    { label: "Others", color: "#A78BFA", value: 5 },
  ];

  // Dummy recent claimed items
  const recentClaims = [
    { title: "iPhone 14", date: "Dec 18, 2024", status: "Approved" },
    { title: "MacBook Pro", date: "Dec 17, 2024", status: "Pending" },
  ];

  // Pie chart calculation
  const totalCat = categories.reduce((sum, c) => sum + c.value, 0);
  let prev = 0;
  const pieData = categories.map((cat) => {
    const start = prev;
    const end = prev + (cat.value / totalCat) * 100;
    prev = end;
    return { ...cat, start, end };
  });

  return (
    <div className="bg-[#F7F9FB] min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1" style={{ color: "#030069" }}>
            Welcome, {userName || "User"}
          </h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
            <FaUser className="mr-1" /> User
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow p-6 flex flex-col justify-between h-full"
            >
              <div className="text-sm font-semibold text-gray-700 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-[#030069]">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold mb-4">Weekly Activity</div>
            <svg width="100%" height="180" viewBox="0 0 400 180">
              {/* X axis labels */}
              {days.map((d, i) => (
                <text
                  key={d}
                  x={30 + i * 55}
                  y={170}
                  fontSize="12"
                  fill="#888"
                  textAnchor="middle"
                >
                  {d}
                </text>
              ))}
              {/* Y axis lines */}
              {[7, 14, 21, 28].map((y, i) => (
                <g key={y}>
                  <line
                    x1={30}
                    x2={400 - 30}
                    y1={160 - (y - 7) * 4.5}
                    y2={160 - (y - 7) * 4.5}
                    stroke="#E5E7EB"
                    strokeDasharray="2,2"
                  />
                  <text
                    x={10}
                    y={164 - (y - 7) * 4.5}
                    fontSize="11"
                    fill="#bbb"
                  >
                    {y}
                  </text>
                </g>
              ))}
              {/* Claims line */}
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                points={claims
                  .map((v, i) => `${30 + i * 55},${160 - (v - 7) * 4.5}`)
                  .join(" ")}
              />
              {/* Claims dots */}
              {claims.map((v, i) => (
                <circle
                  key={i}
                  cx={30 + i * 55}
                  cy={160 - (v - 7) * 4.5}
                  r="4"
                  fill="#3B82F6"
                  stroke="#fff"
                  strokeWidth="1"
                />
              ))}
              {/* Founds line */}
              <polyline
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
                points={founds
                  .map((v, i) => `${30 + i * 55},${160 - (v - 7) * 4.5}`)
                  .join(" ")}
              />
              {/* Founds dots */}
              {founds.map((v, i) => (
                <circle
                  key={i}
                  cx={30 + i * 55}
                  cy={160 - (v - 7) * 4.5}
                  r="4"
                  fill="#22C55E"
                  stroke="#fff"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
          {/* Item Categories Pie */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="font-semibold mb-4 w-full text-left">Item Categories</div>
            <svg width="160" height="160" viewBox="0 0 40 40">
              {pieData.map((cat, i) => (
                <circle
                  key={cat.label}
                  r="16"
                  cx="20"
                  cy="20"
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth="8"
                  strokeDasharray={`${cat.end - cat.start} ${100 - (cat.end - cat.start)}`}
                  strokeDashoffset={25 - cat.start}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              ))}
              <circle
                r="10"
                cx="20"
                cy="20"
                fill="#fff"
              />
            </svg>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-2 text-sm">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Claimed Items */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold">Recent Item Claimed</div>
            <a
              href="/claim-history"
              className="text-blue-700 text-sm font-semibold hover:underline"
            >
              See more
            </a>
          </div>
          <div>
            {recentClaims.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b last:border-b-0"
              >
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}