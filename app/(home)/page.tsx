import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <p>Wanna discover new books?</p>
      Go to the <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
