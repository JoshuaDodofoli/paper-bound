import Transition from "../components/Transition";
import Wrapper from "../components/Wrapper";
import Header from "./(components)/header/Header";
import Navbar from "./(components)/navbar/Navbar";

interface childrenProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: childrenProps) {
  return (

    <div className="">
      <Transition>
        <Header />
        {children}
      </Transition>
      <Navbar />
    </div>
  );
}
