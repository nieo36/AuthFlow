import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
	storeid: {
		type: String,
		required: [true, "Add a store ID"],
		unique: true,
		trim: true,
		maxlength: [10, "Store ID must be 10 or less than 10 characters"],
	},
	address:{
		type:String,
		required:[true,"Adress required"]
	}
	,
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required:true
		},
		coordinates: {
			type: [Number],
			required:true
		},
		formattedAddress:String
	},
	createdAt:{
		type:Date,
		default:Date.now()
	}
});

export const storeCollection=mongoose.model("store",storeSchema);
