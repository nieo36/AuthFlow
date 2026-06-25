import {z} from 'zod';

export const registerSchema=z.object({
	email:z.email().min(6),
	password:z.string().min(6),
	name:z.string().min(2)
})

export const loginSchema=z.object({
	email:z.email().min(6),
	password:z.string().min(6),
	twoFactorCode: z.string().optional()
})