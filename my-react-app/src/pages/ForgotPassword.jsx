import { Link } from "react-router-dom";

export default function ForgotPassword() {
return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4">
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Forgot your Password</h2>
                <p className="text-sm mt-1">Please verify your email</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border-2 border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button className="block mx-auto bg-indigo-900 text-white py-2 px-6 rounded hover:opacity-90 transition duration-150">
                    Verify my email
                </button>

            </div>

            <p className="text-center text-sm mt-4">
                Remember your password?{" "}
                <Link to="/signin" className="text-blue-700 font-semibold hover:underline">
                    Go back to Sign In
                </Link>
            </p>
        </div>
    </div>
);
}
