"use client"

import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
// import "@react-pdf-viewer/core/lib/styles/index.css"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { useLazyGetRanksQuery } from "@/store/api/matrixApi"

const blobToUrl = (blob) => {
  return URL.createObjectURL(blob)
}

const PDF = () => {
  const searchParams = useSearchParams()
  const method = searchParams.get("method")
  const tahun = searchParams.get("tahun")
  const size = searchParams.get("size")

  const [getData] = useLazyGetRanksQuery()

  const Laporan = (data) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const options = { day: "numeric", month: "long", year: "numeric" }
    const formatToday = new Intl.DateTimeFormat("id-ID", options).format(
      new Date()
    )

    console.log(data)

    const values = []
    data?.map((d, i) => {
      values.push([
        {
          fontSize: 10,
          text: i + 1,
        },
        {
          fontSize: 10,
          text: d.nik,
        },
        {
          fontSize: 10,
          text: d.nama,
        },
        {
          fontSize: 10,
          text: d.divisi,
        },
        {
          fontSize: 10,
          text: d.total,
        },
        {
          fontSize: 10,
          text: i + 1,
        },
      ])
    })

    const docDefinition = {
      content: [
        // {
        //   image:
        //     "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAD+AZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6", // Reference the image directly from the public directory
        //   width: 600,
        //   height: 800,
        //   absolutePosition: { x: 0, y: 0 },
        // },
        {
          text: "HASIL LAPORAN",
          bold: true,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: "SISTEM PENUNJANG KEPUTUSAN MENGGUNAKAN",
          bold: true,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: "METODE SIMPLE ADDITIVE WEIGHTING",
          bold: true,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: "DI PT. BANK JASA JAKARTA",
          bold: true,
          alignment: "center",
          fontSize: 14,
        },
        {
          text: "Jln. Jendral Sudirman No. Kav. 5-6, RT.10/RW.6, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10220",
          bold: false,
          alignment: "center",
          fontSize: 7,
        },
        {
          canvas: [
            { type: "line", x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2 },
          ],
        },
        {
          text: `Jakarta, ${formatToday}`,
          bold: false,
          alignment: "right",
          fontSize: 10,
          margin: [0, 10, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: [30, "*", "*", "*", "*", "*"],
            body: [
              ["No.", "NIK", "Nama", "Divisi", "Hasil", "Ranking"],
              ...values,
            ],
          },
          margin: [0, 10, 0, 10],
        },
      ],
    }

    const pdfDoc = pdfMake.createPdf(docDefinition)
    pdfDoc.getBlob((dataUrl) => {
      const pdfUrl = blobToUrl(dataUrl)
      document.getElementById("iframe-pdf-renderer").src = pdfUrl
    })
  }

  useEffect(() => {
    if (method === "laporan") {
      getData({ tahun: tahun, size: size })
        .unwrap()
        .then((payload) => { 
          console.log(payload)
          Laporan(payload)
        })
        .catch((err) => console.error(err))
    }
  }, [method, tahun, size])

  return (
    <div>
      <CssBaseline />
      {method === "laporan" ? (
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

// const data = [
//   { nik: 12131231231, nama: "Dwi", divisi: "IT", hasil: 5, ranking: 1 },
//   { nik: 34578934534, nama: "Budi", divisi: "Finance", hasil: 4, ranking: 2 },
// ]

export default PDF
