import User from "@/modals/user.modal";
import { connect } from "@/utils/db";

export const CreateUserAction = async (formData: any) => {
  await connect();

  try {
    console.log(formData);
    const user = new User(formData);
    await user.save();
    return user;
  } catch (error) {
    console.error(error);
  }
};
