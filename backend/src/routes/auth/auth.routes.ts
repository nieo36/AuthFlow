import express from "express";
import {
	loginHandler,
	registerHandler,
	verifyEmailHandler,
	refreshTokenHandler,
	logoutHandler,
	forgotPasswordHandler,
	resetPasswordHandler,
	googleAuthStartHandler,
	googleAuthCallbackHandler,
	twoFactorSetupHandler,
	twoFactorVerifyHandler,
} from "../../controllers/auth/auth.controller.js";
import { requireAuth } from "../../middleware/auth.js";
const auth = express.Router();

auth.post("/login", loginHandler);
auth.post("/register", registerHandler);
auth.get("/verify-email", verifyEmailHandler);
auth.post("/refresh", refreshTokenHandler);
auth.post("/logout", logoutHandler);
auth.post("/forgot-Password", forgotPasswordHandler);
auth.post("/reset-password", resetPasswordHandler);
auth.get("/google", googleAuthStartHandler);
auth.get("/google/callback",googleAuthCallbackHandler);
auth.post("/2fa/setup",requireAuth,twoFactorSetupHandler);
auth.post("/2fa/verify",requireAuth,twoFactorVerifyHandler);

export { auth };
