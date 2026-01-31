import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneForm from "./PhoneForm";
import OtpForm from "./OtpForm";

export default function AuthFlow() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handlePhoneSubmit = (enteredPhone) => {
    setPhone(enteredPhone);
    setStep("otp");
  };

  const handleOtpSubmit = (otp) => {
    console.log("OTP OK:", otp);

    // لاگین موفق
    localStorage.setItem("auth", "true");

    // ریدایرکت به صفحه اصلی
    navigate("/");
  };

  const handleResendOtp = () => {
    console.log("resend for", phone);
  };

  return (
    <>
      {step === "phone" && (
        <PhoneForm onSubmit={handlePhoneSubmit} />
      )}

      {step === "otp" && (
        <OtpForm
          phone={phone}
          onSubmit={handleOtpSubmit}
          onResend={handleResendOtp}
        />
      )}
    </>
  );
}
