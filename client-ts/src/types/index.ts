export interface SignUpFormData {
  username: string
  email: string
  password: string
}

export type SignInFormData = Omit<SignUpFormData, 'username'>

export interface User {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  avatar: string
}

export interface ListingProps {
  _id: string
  imageUrls: string[]
  name: string
  description: string
  address: string
  type: 'rent' | 'sale'
  bedrooms: number
  bathrooms: number
  regularPrice: number
  discountPrice?: number
  offer: boolean
  parking: boolean
  furnished: boolean
  userRef: User
  createdAt: string
  updatedAt: string
  // __v: number
}

export interface SearchData {
  searchTerm: string
  type: 'all' | 'rent' | 'sale'
  parking: boolean
  furnished: boolean
  offer: boolean
  sort: string
  order: 'asc' | 'desc'
}

export interface FormData {
  imageUrls: string[]
  name: string
  description: string
  address: string
  type: 'rent' | 'sale'
  bedrooms: number
  bathrooms: number
  regularPrice: number
  discountPrice: number
  offer: boolean
  parking: boolean
  furnished: boolean
}
