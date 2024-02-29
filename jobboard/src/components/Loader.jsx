import LoaderImg from "../assets/loader.png";

function Loader() {
    return (
        <>
            <div id="loading" className=" w-full flex justify-center items-center">
                <div className="my-auto flex justify-center items-center h-[100vh]">
                    <img src={LoaderImg} className="animate-spin" width={70} alt="" />
                </div>
            </div>
        </>
    );
}

export default Loader;