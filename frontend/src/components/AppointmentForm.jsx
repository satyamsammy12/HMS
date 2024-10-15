import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorDepartment, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hms-backend-rk9d.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        if (data && Array.isArray(data.data)) {
          setDoctors(data.data);
        } else {
          console.error("Unexpected response structure:", data);
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointmentDate ||
      !doctorDepartment ||
      !doctorFirstName ||
      !doctorLastName ||
      !address
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://hms-backend-rk9d.onrender.com/api/v1/appointment/post/appointment",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          address,
          hasVisited,
          appointmentDate,
          department: doctorDepartment, // Change made here
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="containers form-component appointment-form">
      <h2 className="flex justify-center text-3xl font-semibold">
        Appointment
      </h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            className="input-field"
            type="text"
            id="firstName"
            value={firstName}
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="text"
            id="lastName"
            value={lastName}
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="input-field"
            type="email"
            id="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="tel"
            id="phone"
            value={phone}
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="input-field h-16"
            type="text"
            id="nic"
            value={nic}
            placeholder="Enter NIC"
            onChange={(e) => setNic(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select
            className="input-field h-16"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            className="input-field"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <select
            className="input-field"
            value={doctorDepartment}
            onChange={(e) => {
              const selectedDepartment = e.target.value;
              setDepartment(selectedDepartment);
              setDoctorFirstName(""); // Reset doctor selection
              setDoctorLastName("");
            }}
            required
          >
            <option value="">Select Department</option>
            {departmentArray.map((depart, index) => (
              <option key={index} value={depart}>
                {depart}
              </option>
            ))}
          </select>

          <select
            className="input-field"
            id="doctor"
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!doctorDepartment}
            required
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === doctorDepartment)
              .map((doctor, index) => (
                <option
                  key={index}
                  value={`${doctor.firstName} ${doctor.lastName}`}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>
        <input
          className="input-field"
          type="text"
          id="address"
          value={address}
          placeholder="Enter Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" className="input-field" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
