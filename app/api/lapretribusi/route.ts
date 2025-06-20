import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { getCurrentSession } from "@/lib/session";
import db from "@/lib/db";
import { format } from "date-fns";

export const GET = async (request: NextRequest) => {
  try {
    const { user } = await getCurrentSession();
    if (user === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorize",
        },
        { status: 403 }
      );
    }
    const searchParams = request.nextUrl.searchParams;
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const kasir = searchParams.get("kasir");
    const loketbayar = searchParams.get("loketbayar");

    if (!start || !end) {
      return NextResponse.json(
        { message: "Parameter 'start' dan 'end' wajib diisi." },
        { status: 400 }
      );
    }

    const query = `
      SELECT id,periode_rek as periode, no_pelanggan, nama, alamat, kodegol, retribusi, nama_user, nama_loket
  FROM drd WHERE retribusi > 0 AND flaglunas = 1 
        AND DATE(tglbayar) BETWEEN ? AND ?
        ${kasir ? "AND nama_user = ?" : ""}
        ${loketbayar ? "AND nama_loket= ?" : ""}
    `;

    const queryParams: any[] = [start, end];
    if (kasir) queryParams.push(kasir);
    if (loketbayar) queryParams.push(loketbayar);
    console.log(queryParams);
    const [data] = await db.query<RowDataPacket[]>(query, queryParams);

    const query2 = `
    SELECT sum(retribusi) as totalrp, count(no_pelanggan) as lbr, nama_user 
    FROM drd 
    WHERE retribusi > 0 
      AND DATE(tglbayar) BETWEEN ? AND ?
      ${kasir ? "AND nama_user = ?" : ""}
      ${loketbayar ? "AND nama_loket = ?" : ""}
    GROUP BY nama_user
  `;
    const [kasirData] = await db.query<RowDataPacket[]>(query2, queryParams);

    const query3 = `
    SELECT sum(retribusi) as totalrp, count(no_pelanggan) as lbr, nama_loket 
    FROM drd 
    WHERE retribusi > 0 
      AND DATE(tglbayar) BETWEEN ? AND ?
      ${kasir ? "AND nama_user = ?" : ""}
      ${loketbayar ? "AND nama_loket = ?" : ""}
    GROUP BY nama_loket
  `;

    const [loketbayarData] = await db.query<RowDataPacket[]>(
      query3,
      queryParams
    );

    let filter = "";

    if (kasir) filter += `| Kasir = ${kasir} `;
    if (loketbayar) filter += `| Loket Bayar = ${loketbayar} `;

    return NextResponse.json({
      status: 200,
      data,
      periode: `${start} - ${end}`,
      filter,
      rekapitulasi: {
        kasir: kasirData,
        loketBayar: loketbayarData,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        status: error.status || 500,
        message: error.message || "Internal server error",
      },
      { status: error.status || 500 }
    );
  }
};
