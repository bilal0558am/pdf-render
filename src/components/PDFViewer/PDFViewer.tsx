import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./PDFViewer.styles.scss";
import { Loader } from "../Loader/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const PDF_MAX_WIDTH = 600;

export const PDFViewer = ({ file }: { file: string | File }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const previousPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const nextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pdf-container">
      <div className="pdf-container__pdf-view">
        <Document
          file={file}
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Loader />}
        >
          <Page
            pageNumber={pageNumber}
            width={Math.min(width - 32, PDF_MAX_WIDTH)}
          />
        </Document>
      </div>

      <div className="pdf-container__navigation-wrapper">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <div className="pdf-container__navigation-buttons">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
