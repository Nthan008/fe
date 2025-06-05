// src/components/Spinner.jsx
export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full p-10">
      <div className="w-12 h-12 border-4 border-[#003874] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
