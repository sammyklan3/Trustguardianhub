import { ClimbingBoxLoader } from "react-spinners";
import "./loader.css";

export const Loader = () => {
  return (
    <div className="loading-spinner-overlay">
      <ClimbingBoxLoader color="black" />
    </div>
  )
}