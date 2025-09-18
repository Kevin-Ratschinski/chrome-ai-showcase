export default function Counter({ value, max }: { value: string; max: number }) {
  const count = value.length;
  const warn = count > max;
  return (
    <div className={`text-xs mt-1 ${warn ? "text-red-600" : "text-slate-500"}`}>
      {count}/{max}
    </div>
  );
}
