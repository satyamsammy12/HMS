import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true); // Set loading before fetching
      try {
        const { data } = await axios.get(
          "https://hms-backend-rk9d.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        console.log("Fetched doctors:", data); // Log the response
        setDoctors(data.data || []); // Correctly set doctors from data array
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch doctors."
        );
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {loading ? ( // Conditional loading rendering
          <h1>Loading...</h1>
        ) : doctors.length > 0 ? (
          doctors.map((element) => (
            <div className="card" key={element._id}>
              {" "}
              {/* Added key prop */}
              <img
                src={element.docAvatar && element.docAvatar.url}
                alt="doctor avatar"
              />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  DOB: <span>{element.dob.substring(0, 10)}</span>
                </p>
                <p>
                  Department: <span>{element.doctorDepartment}</span>
                </p>
                <p>
                  NIC: <span>{element.nic}</span>
                </p>
                <p>
                  Gender: <span>{element.gender}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
