import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="w-[90%] max-w-[1100px] min-h-[60vh] sm:min-h-[65vh] mx-auto my-8 sm:my-[60px] px-5 py-[30px] flex flex-col items-center justify-center text-center">

      <h1 className="text-[90px] sm:text-[150px] font-extrabold text-blue-600 leading-none tracking-[8px]">
        404
      </h1>

      <h2 className="text-2xl sm:text-[32px] font-bold text-[#222] mt-5 mb-2.5">
        Page not found
      </h2>

      <Link
        to="/"
        className="inline-block mt-4 bg-blue-600 text-white px-[22px] py-[11px] sm:px-7 sm:py-[13px] rounded-[7px] text-sm sm:text-base font-semibold hover:bg-blue-700 hover:-translate-y-[3px] transition duration-300"
      >
        Back to Home
      </Link>

    </main>
  );
}

export default NotFound;