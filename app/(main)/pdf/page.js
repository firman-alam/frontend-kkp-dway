import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { useRouter } from "next/router"
import { useEffect } from "react"

const PDF = () => {
  const { query } = useRouter()

  const Laporan = (data) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const docDefinition = {
      content: [],
    }

    const pdfDoc = pdfMake.createPdf(docDefinition)
    pdfDoc.getBlob((dataUrl) => {
      const pdfUrl = blobToUrl(dataUrl)
      document.getElementById("iframe-pdf-renderer").src = pdfUrl
    })
  }

  useEffect(() => {
    switch (query.method) {
      case "laporan":
        if (query.laporan) {
        }
        break

      default:
        break
    }
  }, [query.method])

  return (
    <div>
      <CssBaseline />
      {query.method ? (
        <iframe
          id="iframe-pdf-renderer"
          style={{ width: "100%", height: "100vh" }}
          src={""}
        />
      ) : (
        "Data Tidak Ditemukan"
      )}
    </div>
  )
}

export default PDF
