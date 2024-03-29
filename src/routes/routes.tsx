import { Navigate, Route, Routes } from "react-router-dom";
import { PsicologosRegister } from "../pages/signupPsicologo/SignupPsicologo";
import { Home } from "../pages/home/Home";
import PatientProfile from "../pages/patientProfile/PatientProfile";
import { Signin } from "../pages/signin/Signin";
import PsychologistProfile from "../pages/psychologistProfile/PsychologistProfile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<PsicologosRegister />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/psychologistprofile" element={<PsychologistProfile />} />
      <Route path="/patientProfile" element={<PatientProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}