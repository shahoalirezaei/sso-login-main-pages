import Header from "../components/layout/Header";
import ServiceCard from "../components/cards/ServiceCard";
import { FaCity, FaRecycle, FaMoneyBill } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative m-h-screen lg:h-screen overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/snadej-m.webp')" }}
      />

      {/* blur + dark overlay */}
      <div className="absolute inset-0 backdrop-blur-xs bg-black/60" />

      {/* content */}
      <div className="relative z-10 min-h-screen">
        <Header />

        <main className="p-6 sm:h-screen flex flex-col sm:flex-row justify-center gap-y-7 sm:gap-6 items-center">
          <ServiceCard
            title="سنندج من"
            Icon={FaCity}
            onClick={() => alert("سنندج من")}
          />
          <ServiceCard
            title="خدمات شهری"
            Icon={FaRecycle}
            onClick={() => alert("خدمات شهری")}
          />
          <ServiceCard
            title="مالی"
            Icon={FaMoneyBill}
            onClick={() => alert("مالی")}
          />
        </main>
      </div>
    </div>
  );
}
