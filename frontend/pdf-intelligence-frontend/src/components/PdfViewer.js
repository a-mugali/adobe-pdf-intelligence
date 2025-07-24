import React, { useEffect } from 'react';

const PdfViewer = ({ fileUrl }) => {
  useEffect(() => {
    if (!fileUrl) return;

    const interval = setInterval(() => {
      if (window.AdobeDC) {
        clearInterval(interval);

        const adobeDCView = new window.AdobeDC.View({
  clientId: "869864d3c01842f1b3aadc1b156ad971", // hardcoded here
  divId: "adobe-dc-view"
});


        adobeDCView.previewFile({
          content: { location: { url: fileUrl } },
          metaData: { fileName: fileUrl.split('/').pop() }
        }, { embedMode: "SIZED_CONTAINER" });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [fileUrl]);

  return <div id="adobe-dc-view" style={{ height: "600px" }} />;
};

export default PdfViewer;