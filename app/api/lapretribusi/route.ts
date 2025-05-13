import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { getCurrentSession } from "@/lib/session";
import db from "@/lib/db";
import { format } from "date-fns";

export const GET = async (request: NextRequest) => {
  try {
    const { user } = await getCurrentSession();
    // if (user === null) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unauthorize",
    //     },
    //     { status: 403 }
    //   );
    // }
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
      SELECT periode, nosamb, nama, alamat, kodegol, retribusi, kasir, loketbayar, rekair, dendatunggakan, meterai
      FROM drd 
      WHERE retribusi > 0 
        AND flaglunas = 1 
        AND date(tglbayar) BETWEEN ? AND ?
        ${kasir ? "AND kasir = ?" : ""}
        ${loketbayar ? "AND loketbayar = ?" : ""}
    `;

    const queryParams: any[] = [start, end];
    if (kasir) queryParams.push(kasir);
    if (loketbayar) queryParams.push(loketbayar);
    console.log(queryParams);
    const [data] = await db.query<RowDataPacket[]>(query, queryParams);
 
    const query2 = `
    SELECT sum(retribusi) as totalrp, count(nosamb) as lbr, kasir 
    FROM drd 
    WHERE retribusi > 0 
      AND tglbayar BETWEEN ? AND ?
      ${kasir ? "AND kasir = ?" : ""}
      ${loketbayar ? "AND loketbayar = ?" : ""}
    GROUP BY kasir
  `;

    const [kasirData] = await db.query<RowDataPacket[]>(query2, queryParams);

    const query3 = `
    SELECT sum(retribusi) as totalrp, count(nosamb) as lbr, loketbayar 
    FROM drd 
    WHERE retribusi > 0 
      AND tglbayar BETWEEN ? AND ?
      ${kasir ? "AND kasir = ?" : ""}
      ${loketbayar ? "AND loketbayar = ?" : ""}
    GROUP BY loketbayar
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
