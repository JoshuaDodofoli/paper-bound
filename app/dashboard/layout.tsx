import Wrapper from "../components/Wrapper";
import Navbar from "./(components)/navbar/Navbar";

interface childrenProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: childrenProps) {
  return (

    <div className="min-h-full flex flex-col">
      <Wrapper>
        {children}
        <Navbar />
      </Wrapper>
    </div>
  );
}
