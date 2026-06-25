import { type Request, type Response } from "express";
import { storeCollection } from "../../model/store.model.js";
import { geocoder } from "../../utils/geocoder.js";

interface poststore {
	storeid: string;
	address: string;
}

interface getstore {
	storeid: string;
	address: string;
	createdAt: Date;
}

export async function getStore(req: Request|any, res: Response) {
	try {
		const data: getstore[] = await storeCollection.find(
			{},
			{
				__v: 0,
				_id: 0,
			}
		);

		return res.status(200).json({
			success: true,
			count: data.length,
			data: data,
			userInfo:req.userInfo
		});
	} catch (err) {
		console.error("Data fetching error:", err);
		res.status(400).json({ error: "Server Error bad request" });
	}
}

export async function postStore(req: Request, res: Response) {
	try {
		const { storeid, address } = req.body as poststore;

		const option = await geocoder.geocode(address);

		if (!option.length || option[0]!.latitude == null || option[0]!.longitude == null) 
		{
			return res.status(400).json({
				success: false,
				message: "Invalid address or geocoding failed",
			});
		}
		const [lat, lon] = [option[0]!.latitude , option[0]!.longitude];

		const data = await storeCollection.create({
			storeid,
			address,
			location: {
				type: "Point",
				coordinates: [lon, lat],
			},
		});

		return res.status(201).json({
			success: true,
			data: data,
			geocoded: option,
		});
	} catch (err:any) {
		console.error("post data error:", err);
		if (err.code === 11000) {
			res.status(400).json({
				success: false,
				error: "Store id already exists!!",
			});
		}
		res.status(400).json({
			error: "Server Error",
		});
	}
}
