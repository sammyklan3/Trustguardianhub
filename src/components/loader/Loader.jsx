import { HashLoader } from 'react-spinners';
import "./loader.css";

export const Loader = () => {
  return (
    <div className="loading-spinner-overlay">
      <HashLoader color="#DB3B18" />
    </div>
  )
}