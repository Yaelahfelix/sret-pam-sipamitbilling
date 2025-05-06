import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { getCurrentSession } from "@/lib/session";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { user } = await getCurrentSession();

    if (user === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 }
      );
    }

    const formData = await request.formData();

    const { oldPassword, newPassword } = {
      oldPassword: formData.get("oldPassword") as string,
      newPassword: formData.get("newPassword") as string,
    };

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password lama dan password baru wajib diisi",
        },
        { status: 422 }
      );
    }

    const [userData] = await db.query<RowDataPacket[]>(
      "SELECT id, email, password FROM web_admin_user WHERE id = ?",
      [user.id]
    );

    if (userData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const currentUser = userData[0];

    const isPasswordValid = bcrypt.compareSync(
      oldPassword,
      currentUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Password lama tidak sesuai",
        },
        { status: 422 }
      );
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const [result] = await db.execute<RowDataPacket[]>(
      "UPDATE web_admin_user SET password = ? WHERE id = ?",
      [hashedPassword, user.id]
    );

    // @ts-ignore
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal memperbarui password",
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Password berhasil diperbarui",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reset password:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}
