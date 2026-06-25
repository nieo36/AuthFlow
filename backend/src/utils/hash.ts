 import bcrypt from "bcryptjs";

 export async function hashPassword(passw:string){
 	const salt=await bcrypt.genSalt(10);
 	const hash=await bcrypt.hash(passw,salt);
 	return hash;
 }	

 export async function compareHash(enteredPassword:string,storedHashedPassword:string){
 	const isMatch=await bcrypt.compare(enteredPassword,storedHashedPassword);
 	return isMatch;
 }