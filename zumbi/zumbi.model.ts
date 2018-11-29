import mongoose from 'mongoose'

export interface Zumbi extends mongoose.Document {
	attributes: String,
	weapon: String,
	armor: String
}

const zumbiSchema = new mongoose.Schema({
	attributes: {
		type: String,
		required: true
	},
    weapon: {
        type: String,
        required: true
	},
	armor: {
		type: String,
		required: true
	}
})

export const Zumbi = mongoose.model<Zumbi>('Zumbi',zumbiSchema)