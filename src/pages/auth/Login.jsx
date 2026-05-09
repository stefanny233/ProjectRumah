export default function Login() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome Back
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="admin@luna.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition-all"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
