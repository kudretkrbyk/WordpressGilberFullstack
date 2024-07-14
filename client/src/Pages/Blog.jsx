import BorderAnimationDiv from "../Components/BorderAnimationDiv";
import AnimationBorder from "../Components/AnimationBorder";

export default function Blog() {
  return (
    <div className=" w-full xl:h-screen flex items-center justify-center text-white bg-[#161616] ">
      <div className=" flex flex-col gap-10 w-full p-5 md:p-32 xl:p-48  items-start justify-center">
        <div className="text-xl">Recent news</div>
        <div className="flex flex-col xl:flex-row w-full h-full gap-10">
          <div className="group w-full relative">
            <div className=" w-full">
              <AnimationBorder></AnimationBorder>
            </div>
            <div className=" bg-cover w-full h-[400px] bg-center bg-[url(http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/single-post-03-1024x553.jpg)]"></div>
            <div className=" top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 duration-500 ">
              <BorderAnimationDiv></BorderAnimationDiv>
            </div>
          </div>

          <div className="group w-full relative">
            <div className="z-50 w-full">
              <AnimationBorder></AnimationBorder>
            </div>
            <div className=" bg-cover w-full h-[400px] bg-center bg-[url(http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/single-post-02-1024x553.jpg)]"></div>
            <div className=" top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 duration-500 z-50">
              <BorderAnimationDiv></BorderAnimationDiv>
            </div>
          </div>

          <div className="group w-full relative">
            <div className=" w-full">
              <AnimationBorder></AnimationBorder>
            </div>
            <div className=" bg-cover w-full h-[400px] bg-center bg-[url(http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/single-post-01-1024x468.jpg)]"></div>
            <div className=" top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 duration-500 z-50">
              <BorderAnimationDiv></BorderAnimationDiv>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
