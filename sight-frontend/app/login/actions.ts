"use server";

import { signOut } from "@/auth"
import { signIn } from "@/auth"


export async function loginAction(f:FormData){
    signIn("credentials", { 
			 email: f.get("email") as string,
			 password: f.get("password") as string,
			 redirect:true,
	       callbackUrl:"/dashboard"        
	 })
}


export async function logout(){
	 signOut({ 
		  redirectTo:"/login"
	 })
}


export async function loginWithGoogle(){
  	signIn("google", { 
			 redirect:true,
			 callbackUrl:"/dashboard"        
	 })
}
