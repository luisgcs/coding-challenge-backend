import mongoose from 'mongoose'

export interface Zumbi extends mongoose.Document {
	weapon: String,
	armor: String
}

const zumbiSchema = new mongoose.Schema({
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