export const Header = () => {
  return (
    <div className="p-2 items-center justify-between shadow-sm flex ">
      <h1 className="font-semibold text-2xl">Quiz app</h1>
      <button className=" shadow-sm w-10 h-10 rounded-full">
        <img src="./vercel.svg" alt="vercel" />
      </button>
    </div>
  );
};
