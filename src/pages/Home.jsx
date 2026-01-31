import Header from "../components/layout/Header";
import ServiceCard from "../components/cards/ServiceCard";
import { FaCity, FaRecycle, FaMoneyBill } from "react-icons/fa";

export default function Home() {
    // console.log(RecycleIcon);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="p-6 sm:h-screen flex flex-col sm:flex-row justify-center gap-y-7 sm:gap-6 items-center ">
        
      <ServiceCard title="سنندج من" Icon={FaCity} onClick={() => alert("سنندج من")} />
      <ServiceCard title="خدمات شهری" Icon={FaRecycle} onClick={() => alert("خدمات شهری")} />
      <ServiceCard title="مالی" Icon={FaMoneyBill} onClick={() => alert("مالی")} />
    
      </main>
    </div>
  );
}
