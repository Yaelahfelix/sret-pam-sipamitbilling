import { NextResponse } from 'next/server';
// import mysqlpromise from 'mysql2/promise';
import mysql, { ConnectionOptions } from 'mysql2/promise';
import { cookies } from "next/headers";
import { validateSessionToken } from '@/lib/session';

 interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

 interface User {
	id: number,
	email : string,
	nama : string,
	image : string
}

type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };


export async function GET(request : Request)  {
	try{
		const cookieStore = await cookies();
		const token = cookieStore.get("session")?.value ?? null;
		if (token === null) {
			return NextResponse.json( { session: null, user: null });
		}



		const result = await validateSessionToken(token);
		return NextResponse.json( result);
	} catch (err) { 
		console.log(err);
		return NextResponse.json( { session: null, user: null })
	}

}