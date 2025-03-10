import NavBar from "./components/navbar";
import Hero from "./components/hero";
import Predictions from "./components/predictions";
import { useRef } from "react";

function App() {
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollToPredictions = () => {
    document.body.style.overflow = "auto";
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <div>
        <NavBar />
        <Hero onScrollToPredictions={scrollToPredictions} />
        <Predictions ref={tableRef} />
      </div>
    </>
  );
}

export default App;
