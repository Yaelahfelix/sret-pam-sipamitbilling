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
		
		const [data] = await db.query<RowDataPacket[]>('select a.*,b.kode as koderet from capel_ret a left join tarif_ret b on a.tarif_id=b.id where ISNULL(a.tarif_id) order by a.nama asc',[]);
		// // await db.end();
		// console.log(data);
		return NextResponse.json( {
			success : true, 
			data : data
		},{status : 200})	
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}
}

export async function POST(request : NextRequest) {
	try {

		const { user } = await getCurrentSession();

    // const cookieStore = await cookies();
    // const token = cookieStore.get("session")?.value;
		if (user === null) {
			return NextResponse.json({
				success : false,
				message : 'Unauthorize'
			}, {status: 403})
		}
		const formData = await request.formData();
		
		const {kode,nama,tarif} = {
			kode : formData.get("kode") as string,
			nama : formData.get("nama") as string,		
			tarif : formData.get("tarif") as string
		};


		const [dataCheck] = await db.query<RowDataPacket[]>('select * from tarif_ret where kode=?',[kode]);
		console.log(dataCheck)
		if (dataCheck.length > 0 ) {
			return NextResponse.json({
				success : false,
				message : "Kode Alrerady Exist"
			},
			{
				status: 422
			})	
		}
		const numberTarif = parseInt(tarif) || 0;
	
		const [rows] = await db.execute<RowDataPacket[]>('Insert into tarif_ret (kode,nama,tarif) values (?,?,?)',[kode,nama,numberTarif]);

		const result : any = rows;
		if (result.affectedRows === 0) {
			return NextResponse.json({
				success : false,
				message : "No Record Affected"
			},
			{
				status: 422
			})				
		}

		return NextResponse.json({
			success : true,
			message : "Create Data Success",
			data : result
		}, {status: 200});				
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}




}


