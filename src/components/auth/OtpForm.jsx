import { useEffect, useRef, useState } from "react";

const OTP_LENGTH = 5;
const TOTAL_TIME = 150;    // کل تایمر (ثانیه)
const PASSWORD_TIME = 60;  // پس از این مقدار (ثانیه) ورود با رمز ثابت فعال می‌شود
const TEST_OTP = "12345";  // کد تستی برای OTP
const TEST_PASSWORD = "1111"; // رمز ثابت تستی

export default function OtpForm({ phone = "09123456756", onSubmit, onResend }) {
  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [error, setError] = useState(false);

  const [mode, setMode] = useState("otp"); // "otp" | "password"
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [canUsePassword, setCanUsePassword] = useState(false);

  const inputsRef = useRef([]);

  // تایمر: از لحظه mount شروع میشه
  useEffect(() => {
    setTimeLeft(TOTAL_TIME);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // بعد از گذشت PASSWORD_TIME فعال می‌شه
  useEffect(() => {
    // elapsed = TOTAL_TIME - timeLeft
    const elapsed = TOTAL_TIME - timeLeft;
    if (elapsed >= PASSWORD_TIME) {
      setCanUsePassword(true);
    } else {
      setCanUsePassword(false);
    }
  }, [timeLeft]);

  // paste کامل OTP (اگر کاربر paste کنه)
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) return;
    const arr = pasted.split("").slice(0, OTP_LENGTH);
    const newCode = Array(OTP_LENGTH).fill("");
    arr.forEach((ch, i) => (newCode[i] = ch));
    setCode(newCode);
  };

  // وقتی همه رقم‌ها پر شدن، چک کن
  useEffect(() => {
    if (mode !== "otp") return;
    if (code.every((d) => d !== "")) {
      const otp = code.join("");
      if (otp === TEST_OTP) {
        setError(false);
        onSubmit?.(otp);
      } else {
        setError(true);
      }
    } else {
      if (error) setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, mode]);

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
    if (e.key === "Backspace") {
      if (code[index]) {
        
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        return;
      }
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(TOTAL_TIME);
    setCode(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
    setError(false);
    setMode("otp");
    setPassword("");
    setPasswordError("");
    setCanUsePassword(false);
    onResend?.();
    // restart timer
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleOpenPasswordForm = () => {
    if (!canUsePassword) return;
    setMode("password");
    setPassword("");
    setPasswordError("");
    setError(false);
  };

  const handlePasswordLogin = () => {
    if (password === TEST_PASSWORD) {
      setPasswordError("");
      onSubmit?.("PASSWORD_LOGIN");
    } else {
      setPasswordError("رمز وارد شده صحیح نیست");
    }
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="w-[90vw] max-w-[550px] pb-10 bg-white rounded-2xl p-6 text-center relative">
      {/* close */}
      <button className="absolute top-4 left-4 font-bold text-slate-500">✕</button>

      {/* icon */}
      <div className="flex justify-center -mt-14 mb-4">
        <div className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-10 h-10">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>

      <h2 className="text-lg font-semibold">تأیید شماره همراه</h2>

      <p className="text-sm text-gray-600 mt-2">
        کد {OTP_LENGTH}-رقمی ارسال شده به {phone} را وارد نمایید
      </p>

     
      {mode === "otp" && (
        <>
          <div className="flex justify-center gap-3 mt-6 ltr" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                inputMode="numeric"
                className={`w-10 h-10 rounded-full border text-center text-lg font-semibold ${
                  error ? "border-red-500 ring-2 ring-red-400" : "border-gray-200 focus:ring-2 focus:ring-blue-400"
                }`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mt-2">کد وارد شده صحیح نیست</p>}

          {canUsePassword && timeLeft > 0 && (
            <button
              onClick={handleOpenPasswordForm}
              className="px-5 mt-8 py-2 rounded-full btn-blue text-white text-sm font-medium cursor-pointer"
            >
              ورود با رمز ثابت
            </button>
          )}
        </>
      )}

     
      {mode === "password" && (
        <div className="mt-6 flex flex-col items-center gap-3">
          
          
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            placeholder="رمز عبور"
            className={`w-2/3 h-11 rounded-full px-4 border text-center text-sm outline-none ${
              passwordError ? "border-red-500 ring-2 ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"
            }`}
          />

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button
            onClick={handlePasswordLogin}
            className="px-6 py-2 rounded-full btn-blue text-white text-sm font-medium cursor-pointer"
          >
            ورود
          </button>
          <button
            onClick={() => {
              setMode("otp");
              setPassword("");
              setPasswordError("");
              setError(false);
            }}
            className=" mt-3 text-blue-600 text-sm font-medium cursor-pointer"
          >
            بازگشت به وارد کردن کد
          </button>
        </div>
      )}

      <div className={`text-sm ${timeLeft > 0 ? "mt-6" : "mt-6 absolute left-1/2 -bottom-[20px] -translate-x-1/2"}`}>
        {timeLeft > 0 ? (
          <span className="text-blue-600 font-medium">
            {minutes}:{seconds}
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="px-5 py-2 rounded-full btn-blue text-white text-sm font-medium cursor-pointer"
          >
            ارسال مجدد کد فعال‌سازی
          </button>
        )}
      </div>
    </div>
  );
}
