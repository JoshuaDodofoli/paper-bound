
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className='h-full antialiased'
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </div>
  );
}
