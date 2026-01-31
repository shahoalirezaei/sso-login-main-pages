import { MdClose } from "react-icons/md";

export default function LogoutModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-10 w-[90vw] max-w-[400px] sm:w-[350px] md:w-[400px] rounded-2xl bg-white px-6 py-5 text-center shadow-xl animate-fadeIn">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <MdClose />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 text-white text-xl font-bold">
            !
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-lg font-bold text-gray-800">
          خروج از حساب کاربری
        </h2>

        {/* Description */}
        <p className="mb-6 text-sm text-gray-500 leading-6">
          آیا تمایل دارید از حساب کاربری خود خارج شوید؟
        </p>

        {/* Actions */}
        <div className="flex gap-3 cursor-pointer">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-300 transition"
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition"
          >
            خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );
}
