import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://hms-backend-rk9d.onrender.com/api/v1/messages/send",
          {
            firstName,
            lastName,
            email,
            phone,
            message,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setlastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="containers form-component message-form">
      <h2 className=" text-2xl">Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <textarea
          rows={7}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
