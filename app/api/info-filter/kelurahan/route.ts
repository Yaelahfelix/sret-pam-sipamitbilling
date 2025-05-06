import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/lib/db";
import { getCurrentSession } from "@/lib/session";

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
    const [data] = await db.query<RowDataPacket[]>(
      `
     select kelurahan from capel_ret a left join tarif_ret b on a.tarif_id=b.id where ISNULL(a.tarif_id) group by a.kelurahan order by a.kelurahan,a.alamat,a.nama asc 
      `
    );

    return NextResponse.json({
      status: 200,
      data,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        status: error.status || 500,
        message: error.message || "Internal server error",
      },
      { status: error.status || 500 }
    );
  }
};
