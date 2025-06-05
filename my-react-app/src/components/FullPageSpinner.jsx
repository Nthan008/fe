// src/components/FullPageSpinner.jsx
import Spinner from "./Spinner";

export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-[#9EE7FF] bg-opacity-80 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
