import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function BookAppointment() {
  // States for registration
  const [name, setName] = useState("");
  const [mobile_number, setMobilenumber] = useState("");
  const [id, setId] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedslots, setSelectedSlots] = useState("");
  const [slottime, setSlottime] = useState("");
  const [hasError, setHasError] = useState(false);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMobileNumberMessage, setErrorMobileNumberMessage] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the mobile number change
  const handleMobileNumber = (e) => {
    validateMobileNumber(e);
    setMobilenumber(e.target.value);
    setSubmitted(false);
  };

  // Handling the slots change
  const handleSlots = (e) => {
    console.log("hi..", e);
    var value = slots.filter(function (item) {
      // console.log("key ", item._id);
      console.log("value", e.target.value);
      console.log("id", item._id);
      return item._id === e.target.value;
    });
    console.log("vai", value[0].slots);
    setSelectedSlots(e.target.value);
    setId(e.target.value);
    setSlottime(value[0].slots);
    setSubmitted(false);
  };

  const getSlotData = () => {
    let url = "https://appointmentsbooking.herokuapp.com/api/availableSlots";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setSlots(res.data);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  useEffect(() => {
    getSlotData();
  }, []);

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("object", id);
    if (name === "" || mobile_number === "" || slots === "") {
      setError(true);
    } else {
      setSubmitted(true);
      Appointment();
      routeChange();
      setError(false);
    }
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1 className="errorMsg">Please enter all the fields</h1>
      </div>
    );
  };

  // Posting data
  const Appointment = () => {
    const slots = slottime;
    axios
      .post(`https://appointmentsbooking.herokuapp.com/api/bookAppointment`, {
        name,
        mobile_number,
        slots,
        id,
      })
      .then((result) => {
        if (result.data.status === 200) {
          let Msg = "Appointment done successfully!";
          toast.success(Msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(function () {
            routeChange();
          }, 2000);
        }
      })
      .catch((err) => {
        setTimeout(function () {
          window.location.reload(1);
        }, 6000);
        toast.error("Something wen wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // To navigate in another page
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/appointment_list`;
    navigate(path);
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };

  // validate mobileNumber
  const validateMobileNumber = (e) => {
    var pass = e.target.value;
    if (validator.isMobilePhone(pass)) {
      setErrorMobileNumberMessage("");
    } else {
      setErrorMobileNumberMessage("Enter numeric value only");
      return;
    }
  };

  return (
    <form className="c_form form_rd">
      <ToastContainer />
      <div className="messages">
        {errorMessage()}
        {/* {successMessage()} */}
      </div>
      <h4 className="f_font_head">User appointment booking </h4>
      <div className="form-group">
        <label htmlFor="name" className="f_font">
          Name
        </label>
        <input
          type="text"
          className="form-control f_font"
          id="name"
          name="name"
          aria-describedby="nameHelp"
          placeholder="Enter name"
          maxLength={50}
          required
          onChange={handleName}
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNumber" className="f_font">
          Mobile Number
        </label>
        <input
          type="text"
          className="form-control f_font"
          id="mobileNumber"
          placeholder="Enter mobile number"
          maxLength={10}
          required
          value={mobile_number}
          onChange={handleMobileNumber}
        />
        <span
          style={{
            fontSize: "10px",
            color: "red",
          }}
        >
          {errorMobileNumberMessage}
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="slots" className="f_font">
          Slots
        </label>
        <select
          className="form-control"
          name="slots"
          value={selectedslots}
          onChange={handleSlots}
        >
          <option>Select Slots</option>
          {slots.map((data, key) => {
            return (
              <option key={key} value={data._id}>
                {data.slots}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name" className="f_font">
          ID
        </label>
        <input
          type="text"
          className="form-control f_font"
          id="id"
          name="id"
          aria-describedby="idHelp"
          placeholder="Enter id"
          maxLength={50}
          readOnly
          value={id}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary btn-mr f_font"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div>
        <p className="f_para">
          See booked slots
          <a href="/appointment_list"> List</a>
        </p>
      </div>
    </form>
  );
}
