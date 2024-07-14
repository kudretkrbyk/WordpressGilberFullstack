export default function AnimationBorder() {
  return (
    <div className="absolute w-full h-full z-50">
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-black transition-all duration-500 group-hover:delay-0 delay-[1500ms] group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 group-hover:delay-500 delay-[1000ms] border-black transition-all duration-500 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 group-hover:delay-[1000ms] delay-[500ms] border-black transition-all duration-500 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 group-hover:delay-[1500ms] delay-0 border-black transition-all duration-500 group-hover:h-full"></span>
    </div>
  );
}
