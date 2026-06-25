import QRCode from 'qrcode';

const optAuthUrl=process.argv[2];

if(!optAuthUrl){
	throw new Error('Pass otpAuthUrl as argument');
}

async function main(){
	await QRCode.toFile("./QR/totp.png",optAuthUrl);
	console.log("Saved QR Code");
}

main().catch(err=>{
	console.error(err);
})