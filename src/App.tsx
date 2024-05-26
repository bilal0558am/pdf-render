import "./styles/index.scss";
import { PDFViewer } from "./components/PDFViewer";
import SamplePdf from "./assets/sample.pdf";

function App() {
  return (
    <>
      <PDFViewer file={SamplePdf} />
    </>
  );
}

export default App;
