import Image from "next/image";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

import clsx from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { DRD } from "./columns";
import logo from "@/public/nlogo.svg";
import { Rekapitulasi } from "./page";
import { formatRupiah } from "@/lib/formatRp";
import * as XLSX from 'xlsx';

// Props type definition
type DRDTableProps = {
  data: DRD[];
  periode?: string;
  filter?: string;
  subtitle?: string;
  rekapitulasi: Rekapitulasi;
  footer?: string;
  isLoading: boolean;
};

// Component to be printed
const ReportPrintComponent = React.forwardRef<HTMLDivElement, DRDTableProps>(
  ({ data = [], rekapitulasi, footer, filter, periode }, ref) => {
    return (
      <div
        ref={ref}
        className="print-container"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="header w-full">
          <div className="w-full ">
            <div
              className="border-b w-full border-black"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
                paddingBottom: "15px",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                {/* <img
                  src="/logo/pudam-bayuangga.png"
                  alt="Perumda Air Minum Bayuangga Logo"
                  height={80}
                  width={80}
                /> */}
                <img src={logo.src} width={75} alt="logo"></img>
              </div>
              <div className="w-full">
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <p>PEMERINTAH KOTA KEDIRI</p>
                  <p>DINAS LINGKUNGAN HIDUP, KEBERSIHAN DAN PERTAMANAN</p>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  <p>Jalan Mayor Bismo No. 04 Telp (0354) 682336 Kediri</p>
                </div>
              </div>
            </div>

            <div className="my-4">
              <h1 className="text-lg text-center uppercase">
                Penerimaan Retribusi
              </h1>
              <h3 className="text-sm text-center">{periode}</h3>
            </div>
          </div>
        </div>
        <div className="footer"></div>

        {/* Table container */}
        <table className="w-full">
          <thead>
            <tr>
              <td>
                <div className="header-space">&nbsp;</div>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    {/* Table Header */}
                    <thead
                      style={{
                        display: "table-header-group",
                      }}
                    >
                      <tr>
                        <th colSpan={10}>
                          <div className="text-xs text-left font-normal pb-1">
                            {filter}
                          </div>
                        </th>
                      </tr>
                      <tr style={{ backgroundColor: "#f0f0f0" }}>
                        <th
                          style={{
                            border: "1px solid #000",
                            padding: "5px",
                            fontSize: "12px",
                            width: "4%",
                          }}
                        >
                          No
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            padding: "5px",
                            fontSize: "12px",
                            width: "10%",
                          }}
                        >
                          Periode
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            padding: "5px",
                            fontSize: "12px",
                            width: "10%",
                          }}
                        >
                          No Pelanggan
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            padding: "5px",
                            fontSize: "12px",
                            width: "20%",
                          }}
                        >
                          Nama
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            padding: "5px",
                            fontSize: "12px",
                            width: "6%",
                          }}
                        >
                          Kode Gol
                        </th>

                        <th
                          style={{
                            border: "1px solid #000",
                            padding: "5px",
                            fontSize: "12px",
                            width: "10%",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((item, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
                          >
                            {item.periode}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
                          >
                            {item.nosamb}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
                          >
                            {item.nama}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
                          >
                            {item.kodegol}
                          </td>

                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                              textAlign: "right",
                            }}
                          >
                            {formatRupiah(item.retribusi)}
                          </td>
                          
                        </tr>
                      ))}
                        <tr key={"foote"}>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
                          colSpan={5}
                          >
                           Total
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                              textAlign: "right",
                            }}
                      
                          >
                            {formatRupiah(
                              data?.reduce((acc, item) => {
                                return acc + Number(item.retribusi);
                              },0)
                            )}
                          </td>
                        </tr>
    
                    </tbody>
                  </table>

                  <div className="flex gap-5 mt-5 page-break">
                    <div className="w-6/12">
                      <h1>Rekapitulasi Kasir</h1>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                        }}
                      >
                        {/* Table Header */}
                        <thead
                          style={{
                            display: "table-header-group",
                          }}
                        >
                          <tr style={{ backgroundColor: "#f0f0f0" }}>
                            <th
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                width: "35%",
                              }}
                            >
                              Kasir
                            </th>
                            <th
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                width: "30%",
                              }}
                            >
                              Banyak Lembar
                            </th>
                            <th
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                width: "35%",
                              }}
                            >
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {rekapitulasi?.kasir?.map((item, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "5px",
                                  fontSize: "12px",
                                  textAlign: "left",
                                }}
                              >
                                {item.kasir}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "5px",
                                  fontSize: "12px",
                                  textAlign: "right",
                                }}
                              >
                                {item.lbr}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "5px",
                                  fontSize: "12px",
                                  textAlign: "right",
                                }}
                              >
                                {formatRupiah(parseInt(item.totalrp))}
                              </td>
                            </tr>
                          ))}
                          <tr key={"footerkasir"}>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                            }}
       
                          >
                            Total
                          </td>
                          <td
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                textAlign: "right",
                              }}>
                              {formatRupiah(
                                rekapitulasi.kasir.reduce((acc, item) => {
                                  return acc + Number(item.lbr);
                                }, 0)
                              ).replace("Rp", "")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                              fontSize: "12px",
                              textAlign: "right",
                            }}
                      
                          >
                            {formatRupiah(
                              rekapitulasi.kasir.reduce((acc, item) => {
                                return acc + parseInt(item.totalrp ?? "0");
                              }, 0)
                            )}
                          </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>

                    <div className="w-6/12">
                      <h1>Rekapitulasi Loket</h1>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                        }}
                      >
                        {/* Table Header */}
                        <thead
                          style={{
                            display: "table-header-group",
                          }}
                        >
                          <tr style={{ backgroundColor: "#f0f0f0" }}>
                            <th
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                width: "35%",
                              }}
                            >
                              Kasir
                            </th>
                            <th
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                width: "30%",
                              }}
                            >
                              Banyak Lembar
                            </th>
                            <th
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                width: "35%",
                              }}
                            >
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {rekapitulasi?.loketBayar?.map((item, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "5px",
                                  fontSize: "12px",
                                  textAlign: "left",
                                }}
                              >
                                {item.loketbayar}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "5px",
                                  fontSize: "12px",
                                  textAlign: "right",
                                }}
                              >
                                {item.lbr}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "5px",
                                  fontSize: "12px",
                                  textAlign: "right",
                                }}
                              >
                                {formatRupiah(parseInt(item.totalrp))}
                              </td>
                            </tr>
                          ))}
                          <tr key={"footerloket"}>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                              }}
                            >
                            Total
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                textAlign: "right",
                              }}
                        
                            >
                              {formatRupiah(
                                rekapitulasi.loketBayar.reduce((acc, item) => {
                                  return acc + Number(item.lbr);
                                }, 0)
                              ).replace("Rp", "")}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                padding: "5px",
                                fontSize: "12px",
                                textAlign: "right",
                              }}
                        
                            >
                              {formatRupiah(
                                rekapitulasi.loketBayar.reduce((acc, item) => {
                                  return acc + parseInt(item.totalrp ?? "0");
                                }, 0)
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td>
                <div className="page-footer-space"></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
);

ReportPrintComponent.displayName = "ReportPrintComponent";

const PDFReport: React.FC<DRDTableProps> = (props) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    onAfterPrint: () => {
      console.log("Print completed");
    },
    pageStyle: `
    @media print {
      @page { 
        size: A4; margin: 30px;
        @bottom-right {
          font-size: 12px;
          content: counter(page) " / " counter(pages);
        }
      }
   
      body { 
        -webkit-print-color-adjust: exact; 
        counter-reset: page;
      }

      thead {
        display: table-header-group !important;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      
      thead tr {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      
       .page-break {
    break-before: page; /* Modern browser */
    page-break-before: always; /* Fallback for older browsers */
  }

      .header, .header-space {
        height: 180px;
      }
      
      .footer, .footer-space {
        height: 100px;
      }
      
      .header {
        position: fixed;
        top: 0;
      }
      
      .footer {
        position: fixed;
        bottom: 0;
      }
      
      table {
        page-break-inside: avoid;
      }
                    
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
      
      .signature {
        page-break-before: auto;
        position: relative;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      
      .page-number::after {
        counter-increment: page;
        content: "Halaman " counter(page);
        position: fixed;
        bottom: 10px;
        right: 20px;
        font-size: 12px;
      }
    }
    `,
  });
  const downloadExcel = (data : any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DaftarPenerimaanRetribusi.xlsx");
  };

  return (
    <div>
      <div ref={componentRef} className="hidden-print">
        <ReportPrintComponent {...props} />
      </div>
      <div className="flex flex-row justify-start place-content-end gap-2">
        <Button onClick={()=> downloadExcel(props.data)} disabled={props.isLoading}>
          Export Excel
        </Button>
        <Button onClick={handlePrint as any} disabled={props.isLoading}>
          Cetak
      </Button>
      </div>


      <style jsx>{`
        .hidden-print {
          display: none;
        }

        @media print {
          .hidden-print {
            display: block;
          }

          body * {
            visibility: hidden;
          }

          .hidden-print,
          .hidden-print * {
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default PDFReport;
