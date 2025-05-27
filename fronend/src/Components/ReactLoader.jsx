import ReactModal from 'react-modal'
import Lottie from "lottie-react";
import Loader from "./lottie.json"

const ReactLoader = ({showLoader}) => {
  const Loaderstyle = {
    width: "40%",
    margin: "0 auto"
  }
  return (
    <ReactModal 
    isOpen={showLoader} 
    contentLabel="Minimal Modal Example" 
    className="LoaderModal"
    overlayClassName="OverlayLoader" 
    ariaHideApp={false} 
    shouldCloseOnOverlayClick={false}
    >
    <Lottie animationData={Loader} style={Loaderstyle} />
  </ReactModal>
  )
}
export default ReactLoader