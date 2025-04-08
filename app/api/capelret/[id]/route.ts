import db from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import  { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { getCurrentSession, getSessionOnServerSide } from "@/lib/session";
import { cookies } from "next/headers";



export async function PUT(request : NextRequest,{ params }: { params:  Promise<{ id: string }> }) {
	try {
		const { user } = await getCurrentSession();
		if (user === null) {
			return NextResponse.json({
				success : false,
				message : 'Unauthorize'
			}, {status: 403})
		}
		const param =  await params
		const id =  param.id	

		const body = await request.json();

		const [dataCheck] = await  db.query<RowDataPacket[]>('select * from tarif_ret where id=?',[body.idNumber]);
		if (dataCheck.length === 0 ) {
			return NextResponse.json({
				success : false,
				message : "dataNotexist Tarif"
			},{status: 422})	
		}

		const [dataCheck2] = await  db.query<RowDataPacket[]>('select * from capel_ret where id=?',[id]);
		if (dataCheck2.length === 0 ) {
			return NextResponse.json({
				success : false,
				message : "dataNotexist Calon Pelanggan"
			},{status: 422})	
		}

		const [rows] = await db.execute<RowDataPacket[]>('UPDATE capel_ret set tarif_id=?  where id=?',[body.idNumber,id]);

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
			message : "update Data Success",
			data : rows
		}, {status: 200});
	} catch (error) {
		console.log(error);
		
		return NextResponse.json({
			success : false,
			message : error
		},{status: 500})
	}
}

export async function GET(request: Request,{ params }: { params:  Promise<{ id: string }> }) {
	try {
		const { user } = await getCurrentSession();
		if (user === null) {
			return NextResponse.json({
				success : false,
				message : 'Unauthorize'
			}, {status: 403})
		}

		const param =  await params
		const id =  param.id
		const [dataCheck] = await db.query<RowDataPacket[]>('select * from tarif_ret where id=? order by nama asc',[id]);

		if (dataCheck.length === 0 ) {
			return NextResponse.json({
				success : false,
				message : "dataNotexist"
			},{status: 422})	
		}

		const result = {
			id : dataCheck[0].id,
			kode : dataCheck[0].kode,
			nama : dataCheck[0].nama,
			tarif : dataCheck[0].tarif
		}
		return NextResponse.json( {
			success : true, 
			data : result
		},{status : 200})	
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}
}


export async function DELETE(request: Request,{ params }: { params:  Promise<{ id: string }> }) {
	try {
		const { user } = await getCurrentSession();
		if (user === null) {
			return NextResponse.json({
				success : false,
				message : 'Unauthorize'
			}, {status: 403})
		}

		const param =  await params
		const id =  param.id

		const [dataCheck] = await db.execute<RowDataPacket[]>('DELETE from tarif_ret where id=?',[id]);

		return NextResponse.json( {
			success : true, 
			message : "Success Delete Data"
		},{status : 200})	
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}
}





