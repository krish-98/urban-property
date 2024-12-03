import { model, Schema } from 'mongoose'

export interface IListing extends Document {
  imageUrls: string[]
  name: string
  description: string
  address: string
  type: string
  bedrooms: number
  bathrooms: number
  regularPrice: number
  discountPrice: number
  offer: boolean
  parking: boolean
  furnished: boolean
  userRef: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const listingSchema = new Schema<IListing>(
  {
    imageUrls: {
      type: [String],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Listing = model<IListing>('Listing', listingSchema)

export default Listing
