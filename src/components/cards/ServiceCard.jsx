// components/ServiceCard.jsx
import React from "react";

export default function ServiceCard({ title, Icon, onClick, buttonText = "ورود به سامانه", onButtonClick }) {
  return (
    <div
      dir="rtl"
      className="w-full max-w-[320px] bg-white rounded-[25px] px-6 py-8 flex flex-col items-center shadow-md hover:scale-105 transition-all duration-300 relative"
    >
      {/* Icon */}
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl mb-4">
          <Icon />
        </div>
      )}

      {/* Title */}
      <h3 className="text-center text-lg font-semibold text-slate-900 mb-4">{title}</h3>

      {/* Optional description */}
      <p className="text-center text-sm text-slate-600 mb-6">
        توضیحات کوتاه درباره این سرویس یا عملکرد کارت می‌تواند اینجا باشد.
      </p>

      {/* Button */}
      <button
        type="button"
        onClick={onButtonClick || onClick}
        className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-1/2 h-12 rounded-full btn-blue cursor-pointer text-white font-medium text-sm flex items-center justify-center hover:opacity-95 transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
