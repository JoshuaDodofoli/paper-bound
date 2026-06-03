import Transition from "@/components/chrome/dashboard/Transition";
import Footer from "@/components/chrome/dashboard/Footer";
import Header from "@/components/chrome/dashboard/Header";
import Navbar from "@/components/chrome/dashboard/Navbar";

interface childrenProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: childrenProps) {
  return (

    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Transition>
          {children}
        </Transition>
      </main>
      <Navbar />
      <Footer />
    </div>
  );
}
