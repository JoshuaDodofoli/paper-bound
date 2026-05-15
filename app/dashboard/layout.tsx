import Transition from "../components/Transition";
import Wrapper from "../components/Wrapper";
import Footer from "./(components)/footer/Footer";
import Header from "./(components)/header/Header";
import Navbar from "./(components)/navbar/Navbar";

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
