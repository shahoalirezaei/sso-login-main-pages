import { useEffect, useRef, useState } from "react";

const OTP_LENGTH = 5;
const RESEND_TIME = 20; // seconds (02:30)
const TEST_OTP = "12345"; // برای تست: OTP درست

export default function OtpForm({ phone = "09123456756", onSubmit, onResend }) {
  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME);
  const [error, setError] = useState(false);
  const inputsRef = useRef([]);

  // timer شروع به محض mount
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) clearInterval(timer);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // بررسی OTP به محض پر شدن آخرین رقم
  useEffect(() => {
    if (code.every((d) => d !== "")) {
      const otp = code.join("");
      if (otp === TEST_OTP) {
        onSubmit?.(otp); // OTP درست، مودال بسته میشه
      } else {
        setError(true); // اشتباه، outline قرمز
      }
    } else {
      if (error) setError(false); // پاک کردن خطا وقتی کاربر تغییر داد
    }
  }, [code]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(RESEND_TIME);
    setCode(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    setError(false);
    onResend?.();
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="w-[90vw] max-w-[550px] sm:w-[420px] max-w-full bg-white rounded-2xl p-6 text-center relative">
      {/* close button */}
      <button className="absolute top-4 left-4 font-bold text-slate-500 hover:text-slate-900">
        ✕
      </button>

      {/* icon */}
      <div className="flex justify-center -mt-14 mb-4">
        <div className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-10 h-10">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <h2 className="text-base md:text-lg font-semibold text-gray-900">تأیید شماره همراه</h2>

      <p className="text-xs md:text-sm text-gray-600 mt-2">
        لطفاً کد ۵ رقمی ارسال شده به شماره {phone} را وارد نمایید.
      </p>

      {/* OTP inputs */}
      <div className="flex justify-center gap-3 mt-6 ltr">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`input-base w-8 h-8 md:w-12 md:h-12 rounded-full border text-center text-lg font-semibold focus:outline-none ${
              error ? "border-red-500 ring-2 ring-red-400" : "border-gray-200 focus:ring-2 focus:ring-blue-400 mb-6"
            }`}
          />
        ))}
      </div>

      {/* پیام خطا */}
      {error && <p className="text-red-500 text-xs md:text-sm mt-2 mb-6">کد وارد شده صحیح نیست</p>}

      {/* timer / resend */}
      <div className={` text-sm ${timeLeft > 0 ? "mt-6 " : "absolute left-1/2 -bottom-[20px] -translate-x-1/2"}`}>
        {timeLeft > 0 ? (
          <span className="text-blue-600 font-medium">
            {minutes}:{seconds}
          </span>
        ) : (
          <button
            onClick={handleResend}
            className=" flex items-center justify-center gap-2 mx-auto px-5 py-2 rounded-full btn-blue cursor-pointer text-white text-sm font-medium hover:opacity-90 transition"
          >
            ارسال مجدد کد فعال‌سازی
          </button>
        )}
      </div>
    </div>
  );
}
