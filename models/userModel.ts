import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      default: 'employee',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

//delete old model
if (mongoose.models.users) {
  const userModel = mongoose.model('users')
  mongoose.deleteModel(userModel.modelName)
}
//create new model
const User = mongoose.model('users', userSchema)

export default User
