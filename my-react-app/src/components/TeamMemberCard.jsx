import { FaInstagram, FaGithub } from "react-icons/fa";

export default function TeamMemberCard({ name, instagram, github }) {
  return (
    <div className="bg-yellow-500 text-black p-6 rounded-2xl shadow-lg text-center w-64">
      {/* Profile Image Placeholder */}
      <div className="w-24 h-24 mx-auto rounded-full border-4 border-orange-700 flex items-center justify-center text-sm font-bold">
        Image
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-bold">{name}</h3>

      {/* Instagram Link */}
      <p className="flex justify-center items-center gap-2 mt-2 text-md font-bold">
        <FaInstagram className="text-black" />
        <a href={`https://instagram.com/${instagram}`} className="hover:underline font-bold">
          @{instagram}
        </a>
      </p>

      {/* GitHub Link */}
      <p className="flex justify-center items-center gap-2 mt-2 text-md font-bold">
        <FaGithub className="text-black" />
        <a href={`https://github.com/${github}`} className="hover:underline font-bold">
          github.com/{github}
        </a>
      </p>
    </div>
  );
}
