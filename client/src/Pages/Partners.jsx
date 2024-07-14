export default function Partners() {
  return (
    <div className="w-full md:h-screen flex items-center justify-center  relative p-1 md:p-20 ">
      <div className="w-full h-full bg-[#161616] absolute z-30 "></div>

      <div className="flex flex-col items-start justify-center gap-10 w-full h-full p-20  ">
        {" "}
        <div className="text-5xl text-white z-40  w-full">Partners</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-center place-items-center gap-1 md:gap-10 z-40 w-full   ">
          <div className="p-10 opacity-50 hover:opacity-100 duration-500 self-center  ">
            <img
              src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-01.png"
              alt="Partner 1"
            />
          </div>
          <div className="p-10 opacity-50 hover:opacity-100 duration-500">
            <img
              src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-02.png"
              alt="Partner 2"
            />
          </div>
          <div className="p-10 opacity-50 hover:opacity-100 duration-500">
            <img
              src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-03.png"
              alt="Partner 3"
            />
          </div>
          <div className="p-10 opacity-50 hover:opacity-100 duration-500">
            <img
              src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-04.png"
              alt="Partner 4"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center place-items-center gap-1 md:gap-10 z-40 w-full ">
          <div className="p-10 opacity-50 hover:opacity-100 duration-500 z-20 relative">
            <div className="z-20 relative">
              <img
                src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-05.png"
                alt="Partner 5"
              />
            </div>
          </div>
          <div className="p-10 opacity-50 hover:opacity-100 duration-500 z-20 relative">
            <div className="z-20 relative">
              <img
                src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-06.png"
                alt="Partner 6"
              />
            </div>
          </div>
          <div className="p-10 opacity-50 hover:opacity-100 duration-500 z-20 relative">
            <div className="z-20 relative">
              <img
                src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-07.png"
                alt="Partner 7"
              />
            </div>
          </div>
          <div className="p-10 opacity-50 hover:opacity-100 duration-500 z-20 relative">
            <div className="z-20 relative">
              <img
                src="http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/logo-08.png"
                alt="Partner 8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
