import { MdOutlinePhoneAndroid } from "react-icons/md";

 export default function PhoneForm({ onSubmit, onClose }) {
  const TEST_PHONE = "09123456789"; // شماره تستی ثابت

  return (
    <div
      dir="rtl"
      className="w-[90vw] max-w-[550px] sm:w-[420px] md:w-[550px]  bg-white rounded-[25px] px-10 py-8 relative flex flex-col items-center"
    >
      {/* Close button */}
      <button
      onClick={() => onClose()}
        type="button"
        className="absolute top-4 left-4 text-slate-500 hover:text-slate-900 font-bold"
        aria-label="بستن"
      >
        ✕
      </button>

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="text-xl font-bold text-blue-600">sso -logo</div>
      </div>

      <h2 className="text-center text-xl font-semibold text-slate-900 mb-2">
        ورود یا ثبت‌نام
      </h2>

      <p className="text-center text-sm text-slate-600 leading-6 mb-6 w-4/5">
  لطفا جهت ورود یا ثبت‌نام، شماره همراه خود را وارد کنید. ثبت‌نام شما به منزله پذیرش{" "}
  <span className="text-blue-600 cursor-pointer">قوانین و مقررات</span> و{" "}
  <span className="text-blue-600 cursor-pointer">حریم خصوصی</span> کاربران می‌باشد.
</p>


      {/* Phone input (ظاهرش می‌مونه، ولی تغییرش تاثیری نداره) */}
      <div className="relative mb-6 px-3 w-full md:w-3/4">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xl" aria-hidden>
          <MdOutlinePhoneAndroid />
        </div>
        <input
          type="tel"
          placeholder="0912________"
          value={TEST_PHONE}
          readOnly
          className="input-base w-full h-12 rounded-full pr-14 pl-4 bg-slate-100 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={() => onSubmit?.(TEST_PHONE)} // شماره ثابت میره مرحله بعد
        className=" absolute left-1/2 -bottom-[20px] -translate-x-1/2 btn-blue mt-auto w-1/2 h-12 rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition"
      >
        <span aria-hidden>→</span>
        ادامه فرایند
      </button>
    </div>
  );
}
