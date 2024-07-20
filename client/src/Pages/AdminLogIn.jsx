import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export default function AdminLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/auth", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("giriş başarılı");
        // JWT token'ını local storage'a kaydedin
        localStorage.setItem("token", response.data.token);
        dispatch(login());
        navigate("/admin"); // Giriş başarılıysa admin sayfasına yönlendirin
      }
    } catch (err) {
      if (err.response) {
        // API hatası
        setError(err.response.data.message || "Login failed");
      } else {
        // Diğer hatalar
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="bg-[#161616]">
      <div className="flex flex-col items-center justify-center px-6 py-8 h-screen">
        <div className="w-full bg-white rounded-lg shadow max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-bold text-gray-900 text-2xl">
              Sign in to your account
            </h1>
            {error && <div className="text-red-500">{error}</div>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
