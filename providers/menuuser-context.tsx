"use client"

import { type LucideIcon, SquareTerminal,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  User,

} from "lucide-react";
import React, {createContext,useContext} from "react";

// import { getUser } from "./auth-actions";

interface objMenu  {
  title : string,
  icon? : LucideIcon,
  items : Tbreadcrumb[]
}

interface Tbreadcrumb  {
  title : string,
  url : string,
  ismenu : boolean,
  id : number
}

const pageNames: { [key: string]: objMenu } = {
  "/admin": {
    title :  "Dashboard",
    icon : SquareTerminal,
    items : [{title : "Dashboard", url : "/admin",ismenu : true , id : 4}]
  },
  "/admin/users": {
    title :  "Users",
    icon : User,
    items : [
      {title : "Users", url : "/admin/users",ismenu : true ,id : 3}
    ]
  },
  "/admin/users/create": {
    title :  "Create Users",
    items : [
      {title : "Users", url : "/admin/users",ismenu : false,id : 1},
      {title : "create", url : "/admin/users/create",ismenu : true,id :2}
    ]
  },
  "/admin/users/edit": {
    title :  "Edit Users",
    items : [
      {title : "Users", url : "/admin/users",ismenu : false,id : 1},
      {title : "Edit", url : "/admin/users/edit",ismenu : true,id :2}
    ]
  },
  "/admin/tarif": {
    title :  "Tarif",
    icon : User,
    items : [
      {title : "Tarif", url : "/admin/tarif",ismenu : true ,id : 3}
    ]
  },
  "/admin/tarif/create": {
    title :  "Create Tarif",
    items : [
      {title : "Tarif", url : "/admin/tarif",ismenu : false,id : 1},
      {title : "create", url : "/admin/tarif/create",ismenu : true,id :2}
    ]
  },
  "/admin/tarif/edit": {
    title :  "Edit Tarif",
    items : [
      {title : "Tarif", url : "/admin/tarif",ismenu : false,id : 1},
      {title : "Edit", url : "/admin/tarif/edit",ismenu : true,id :2}
    ]
  },
  "/admin/capel-ret": {
    title :  "Capel. Retribusi",
    icon : User,
    items : [
      {title : "Capel Retribusi", url : "/admin/capel-ret",ismenu : true ,id : 3}
    ]
  },
  "/admin/capel-ret/create": {
    title :  "Create Capel Retribusi",
    items : [
      {title : "Capel. Retribusi", url : "/admin/capel-ret",ismenu : false,id : 1},
      {title : "Create Capel Retribusi", url : "/admin/capel-ret/create",ismenu : true,id :2}
    ]
  },
  // "/admin/tarif/edit": {
  //   title :  "Edit Tarif",
  //   items : [
  //     {title : "Tarif", url : "/admin/tarif",ismenu : false,id : 1},
  //     {title : "Edit", url : "/admin/tarif/edit",ismenu : true,id :2}
  //   ]
  // },

};
export const MenuUserContext = createContext(pageNames)



export function MenuUserProvider({
  children,
}: {
  children: React.ReactNode
}){

return (
 <MenuUserContext.Provider value={pageNames}>
	{children}
</MenuUserContext.Provider> 
)
}

