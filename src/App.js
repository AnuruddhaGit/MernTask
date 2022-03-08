import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import NotFound from './components/pagenotfound';
import BookAppointment from "./pages/BookAppointment";
import AppointmentList from "./pages/AppointmentList";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<BookAppointment />} />
        <Route exact path="appointment_list" element={<AppointmentList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
