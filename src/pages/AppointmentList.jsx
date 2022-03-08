import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppointmentList() {
  const [Users, fetchUsers] = useState([]);
  const [hasError, setHasError] = useState(false);

  const getData = () => {
    let url = "https://appointmentsbooking.herokuapp.com/api/appointmentList";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 404) {
          let Msg = res.message;
          toast.error(Msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        console.log(hasError);
        fetchUsers(res.data);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <h4 className="headingList">Booked Appointment List</h4>
        <ToastContainer />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Slots</th>
              <th scope="col">ID</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.mobile_number}</td>
                <td>{item.slots}</td>
                <td>{item._id}</td>
                <td>{item.status}</td>
                <td className="backfont backbt">
                  <a href="/"> Back </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
