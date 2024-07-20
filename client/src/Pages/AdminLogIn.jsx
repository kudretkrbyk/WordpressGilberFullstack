export default function AdminLogIn() {
  return (
    <section className="bg-[#161616] ">
      <div className="flex flex-col items-center justify-center px-6 py-8  h-screen ">
        <div className="w-full bg-white rounded-lg shadow  max-w-md  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className=" font-bold   text-gray-900 text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-6 " action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block  text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg   w-full p-2.5 "
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-500   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
