import Transition from "@/components/chrome/dashboard/Transition";
import Footer from "@/components/chrome/dashboard/Footer";
import Header from "@/components/chrome/dashboard/Header";
import Navbar from "@/components/chrome/dashboard/Navbar";

interface childrenProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: childrenProps) {
  return (
    <div className="">
      <Header />
      <Transition>
        {children}
      </Transition>
      <Navbar />
      <Footer />
    </div>
  );
}
