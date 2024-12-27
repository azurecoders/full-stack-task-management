const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <img
        src={"loading.gif"}
        alt="Loading Animation"
        width={100}
        height={100}
      />
      <h3 className="text-3xl font-semibold text-slate-800">Loading...</h3>
    </div>
  );
};

export default Loader;
