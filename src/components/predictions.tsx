import { forwardRef } from "react";
import { PredictionsTable } from "./table";

const Predictions = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section ref={ref} className="">
      <div className="flex flex-col mt-36  justify-center items-center">
        <h2 className="text-3xl font-semibold">PREDICTIONS</h2>
      </div>
      <div className="px-24">
        <PredictionsTable />
      </div>
    </section>
  );
});

export default Predictions;
