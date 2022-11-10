# Schema data

## This the schema for the Air Bnb project.  This can be copied directly into dbdiagram.io to view more easily.

Table user {
  id integer
  firstName string
  lastName string
  email string
  username string
  password string
  createdAt date
  updatedAt date
  }

Table spot {
  id integer
  ownerId integer [ref: > user.id]
  previewImage img
  address string
  city string
  state string
  country string
  lat decimal (9,6)
  lng decimal (9,6)
  name string
  description string
  price decimal (6,2)
  createdAt date
  updatedAt date
}

Table booking {
  id integer
  spotId integer [ref: > spot.id]
  userId integer [ref: > user.id]
  startDate date
  endDate date
  createdAt date
  updatedAt date
}

Table review {
  id integer
  userId integer [ref: > user.id]
  spotId integer [ref: > spot.id]
  review string
  stars integer
  createdAt date
  updatedAt date
}

Table spotImg {
  id integer
  spotId integer [ref: > spot.id]
  url string
  preview boolean
  createdAt date
  updatedAt date
}

Table reviewImg {
  id integer
  reviewId integer [ref: > review.id]
  url string
  preview boolean
  createdAt date
  updatedAt date
}
