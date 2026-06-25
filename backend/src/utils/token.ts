 import jwt from "jsonWebToken";

export async function createAccessToken(
	userId: string,
	role: "user" | "admin",
	tokenVersion: number
) {
	const payload = { sub: userId, role, tokenVersion };

	return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
		expiresIn: "15m",
	});
}

export async function createRefreshToken(userId: string,tokenVersion: number){
	return jwt.sign({sub:userId,tokenVersion}, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: "7d",
	});
}

export async function verifyAccessToken(token:string){
	return jwt.verify(token,process.env.JWT_ACCESS_SECRET!) as {sub:string,role:'user'|'amdin',tokenVersion:number};
}

export async function verifyRefreshToken(token:string){
	return jwt.verify(token,process.env.JWT_REFRESH_SECRET!) as {sub:string; tokenVersion:number};
}
