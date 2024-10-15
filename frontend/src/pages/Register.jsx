import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "./../main";
import axios from "axios";

const Register = () => {
  const { setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://hms-backend-rk9d.onrender.com/api/v1/user/patient/register",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsAuthenticated(true);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred while registering."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containers form-component register-form">
      <h2 className="flex justify-center text-3xl font-semibold">Register</h2>
      <h2 className="flex justify-center items-center">
        Please register to continue
      </h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            id="firstName"
            value={firstName}
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            aria-label="First Name" // Adding aria-label for accessibility
          />
          <input
            type="text"
            id="lastName"
            value={lastName}
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            aria-label="Last Name" // Adding aria-label for accessibility
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email" // Adding aria-label for accessibility
          />
          <input
            type="tel"
            id="phone"
            value={phone}
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
            aria-label="Phone" // Adding aria-label for accessibility
          />
        </div>
        <div>
          <input
            type="text"
            id="nic"
            value={nic}
            placeholder="Enter NIC"
            onChange={(e) => setNic(e.target.value)}
            required
            aria-label="NIC" // Adding aria-label for accessibility
          />

          <div class="relative max-w-sm">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              datepicker
              id="default-datepicker"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              class="bg-gray-50 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <div>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            aria-label="Gender" // Adding aria-label for accessibility
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password" // Adding aria-label for accessibility
          />
        </div>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already have an account ?</p>
          <Link to={"/login"} style={{ textDecoration: "none", color: "blue" }}>
            Login Here
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
