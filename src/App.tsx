import "./styles/index.scss";
import { PDFViewer } from "./components/PDFViewer";

const PDF_URL = "https://www.sldttc.org/allpdf/21583473018.pdf";

function App() {
  return (
    <>
      <PDFViewer url={PDF_URL} />
    </>
  );
}

export default App;
