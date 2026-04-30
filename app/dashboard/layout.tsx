
interface childrenProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: childrenProps) {
  return (
    <div
      className='h-full antialiased'
    >
      <div className="min-h-full flex flex-col">{children}</div>
    </div>
  );
}
