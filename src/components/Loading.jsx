import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-latar">
      <ImSpinner2 className="text-primary animate-spin text-5xl mb-4" />
      <h2 className="text-primary font-bold italic tracking-widest uppercase">SIApotek</h2>
    </div>
  );
}