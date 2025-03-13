import { NextResponse } from 'next/server';
// import mysqlpromise from 'mysql2/promise';
import mysql, { ConnectionOptions } from 'mysql2/promise';

const access: ConnectionOptions = {
  user: 'probtirtadhaha',
  database: 'pdamkota_loket',
	password:"HariJadi23Jan!",
	port : 3306,
	host : "192.168.0.88"
};


const conn = await mysql.createConnection(access);

export async function GET(request : Request) {
	try {
		const [data] = await conn.query('select id,nama from jenis_aduan where aktif=1 order by nama asc',[]);
		await conn.end();
		// conn.query('select id,nama from jenis_aduan where aktif=1 order by nama asc', (_err, rows) => {
		// 	conso
		// 	return rows
		// }).then();
		// const jenisAduan = await db.select('id','nama as jenis_aduan').from('jenis_aduan').where('aktif',"1").orderBy('nama','asc');

		return NextResponse.json(data)	
	} catch (error) {
		console.log(error);
		return NextResponse.json(error)	
	}




}