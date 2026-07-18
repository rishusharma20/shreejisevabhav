export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative z-10 pt-24 pb-12">
      {/* Additional subtle atmospheric overlay specific to the Command Temple */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-0 right-0 w-1/2 h-[50vh] bg-gradient-to-b from-rose-900/5 to-transparent blur-[100px]" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
