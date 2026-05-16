

export default function DashboadHeader() {
    return (
        <header className="flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-950">

                <h1>Hello Marie</h1>
                <p className="mt-1 text-sm text-slate-600/60">
                    Here’s your financial overview for today.
                </p>
            </div>


      <div className="flex items-center gap-5">
       

        <button>🔔</button>
         <span>📅 May 15, 2026</span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          MA
        </div>
        
      </div>


        </header>
    )
}