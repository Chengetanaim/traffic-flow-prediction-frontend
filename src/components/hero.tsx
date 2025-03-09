import { Button } from "./ui/button";
import { AddPrediction } from "./add-prediction";

const Hero = () => {
  return (
    <div className="flex items-center justify-center mt-32">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-7xl">Traffic Flow Modelling</h1>

        <h1 className="text-[18px] -m-6 font-thin text-green-300">X</h1>

        <h1 className="text-6xl text-green-300">Machine Learning</h1>
        <div className="flex flex-col gap-2">
          <p>
            Unlock the power of machine learning to forecast and improve traffic
            flow efficiency.
          </p>
          <p>
            Start your project with a Postgres database, Authentication, instant
            APIs, Edge
          </p>
          <p>
            Functions, Realtime subscriptions, Storage, and Vector embeddings.
          </p>
        </div>
        <div className="flex items-center justify-around mt-6">
          <AddPrediction />
          <Button className="bg-green-400 text-black hover:bg-white hover:cursor-pointer">
            Request a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
