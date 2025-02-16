export function UserSkeleton() {
  return (
    <div>
      <div className="flex justify-between items-center bg-slate-100 px-4 py-2 rounded-lg">
        <div className="flex justify-center items-center gap-1">
          <p className="bg-slate-400 rounded-full w-8 h-8 flex justify-center items-center animate-pulse" />
          <p className="w-48 h-8 rounded-lg bg-slate-200 animate-pulse" />
        </div>
        <p className="w-32 h-8 rounded-lg bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
