export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="text-slate-500 font-medium">
        Welcome back, Admin
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
          AD
        </div>
      </div>
    </header>
  );
}
