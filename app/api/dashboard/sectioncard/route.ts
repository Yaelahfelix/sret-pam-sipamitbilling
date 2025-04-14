import db from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import  { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { getCurrentSession, getSessionOnServerSide } from "@/lib/session";
import { cookies } from "next/headers";



export async function GET(request : Request) {
	try {
		const { user } = await getCurrentSession();
		if (user === null) {
			return NextResponse.json({
				success : false,
				message : 'Unauthorize'
			}, {status: 403})
		}
		
		const [data] = await db.query<RowDataPacket[]>(`
			select  
(select count(*) as jml1 from capel_ret a left join tarif_ret b on a.tarif_id=b.id where ISNULL(a.tarif_id)) as jml1,
(Select Count(retribusi) from drd where flaglunas=1 and date_format(tglbayar,"%Y%m")=date_format(current_Date,"%Y%m") and retribusi>0) as jml2,
(Select sum(retribusi) from drd where flaglunas=1 and date_format(tglbayar,"%Y%m")=date_format(current_Date,"%Y%m")) as jml3
			`,[]);
		// // await db.end();
		
		return NextResponse.json( {
			success : true, 
			data : data[0]
		},{status : 200})	
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}
}



