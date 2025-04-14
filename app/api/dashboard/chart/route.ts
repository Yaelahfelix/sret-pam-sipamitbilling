import db from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import  { RowDataPacket } from 'mysql2';
import { getCurrentSession, getSessionOnServerSide } from "@/lib/session";

import { formatNumber } from "@/lib/utils";




export async function GET(request : NextRequest) {
	try {
		const { user } = await getCurrentSession();
		if (user === null) {
			return NextResponse.json({
				success : false,
				message : 'Unauthorize'
			}, {status: 403})
		}
		
		const isMobile = request.nextUrl?.searchParams.get('isMobile')
		const timeRange = request.nextUrl?.searchParams.get('timeRange')

		const timeValue = {
			"7d" : -7,
			"30d" : -30
		}
		const validTimeRange = timeRange === "7d" || timeRange === "30d" ? timeRange : "7d";

		const [data] = await db.query<RowDataPacket[]>(`
				Select date_format(tglbayar,"%Y-%m-%d") as tgl,SUM(retribusi) AS jumlah from drd where flaglunas=1 and date(tglbayar) between date_Add(current_Date, interval ? day) and current_Date  group by date(tglbayar) order by tgl
			`,[timeValue[validTimeRange]]);

		
		const dataFormat = data.map((item) => {
			const ret =  {
				tgl : item.tgl,
				jumlah: Number(item.jumlah),
				jumlahFormat : formatNumber(item.jumlah)
			}
			return ret
		})

		return NextResponse.json( {
			success : true, 
			data : dataFormat
		},{status : 200})	
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}
}



