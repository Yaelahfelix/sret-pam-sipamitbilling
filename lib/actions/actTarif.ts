"use server"

// import { auth } from "@/auth"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"
import { getCurrentSession, setSessionTokenCookie } from "../session"
import { cookies } from "next/headers"

const backendUrl = process.env.BASE_URL

export const getDataAll = async () => {
  try {

    const response = await axios.get(`/api/tarif`)
    return response.data
  } catch (error) {
		console.log(error)
    return axiosErrorHandler(error)
  }
}

export const createData = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    // cookieStore.set("session", token || "" , {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    //   path: "***/***"
    // });
    const response = await axios.post(`${backendUrl}/api/tarif`, formData , {
      headers : { Cookie: cookieStore.toString() }
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const getdataOne = async (id: string | null) => {
  try {
    const cookieStore = await cookies();
    const response = await axios.get(`${backendUrl}/api/tarif/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const editData = async (id: number, formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const response = await axios.put(`${backendUrl}/api/tarif/${id}`, formData, {
      headers : { Cookie: cookieStore.toString() }
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const deleteData = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const response = await axios.delete(`${backendUrl}/api/tarif/${id}`, {
      headers : { Cookie: cookieStore.toString() }
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}