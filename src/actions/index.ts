"use server";

import Todo from "@/modals/todo.modal";
import User from "@/modals/user.modal";
import { connect } from "@/utils/db";
import { revalidatePath } from "next/cache";

// Create User
export const CreateUserAction = async (formData: CreateUserActionType) => {
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

// Create Todo
export const CreateTodoAction = async (
  formData: InitialFormType,
  userId: string | null,
  pathToRevalidate: string
) => {
  await connect();
  console.log(formData);
  try {
    const todo = new Todo({
      userId: userId,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
    });
    await todo.save();
    revalidatePath(pathToRevalidate); // this function will revalidate the page without reloading it
    return {
      success: true,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    };
  } catch (error) {
    console.error(error);
  }
};

// Get All Todos
export const FetchUserTodosAction = async (userId: string) => {
  await connect();

  try {
    const todos = await Todo.find({ userId });

    if (!todos || todos.length === 0) {
      return {
        message: "No todos found",
        todo: [],
      };
    }

    const sanitizeTodo: {
      _id: string;
      title: string;
      description: string;
      priority: string;
    }[] = [];

    todos.map((todo) => {
      sanitizeTodo.push({
        _id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
      });
      return sanitizeTodo;
    });

    return {
      success: true,
      todo: sanitizeTodo,
    };
  } catch (error) {
    console.error(error);
  }
};

// Update Todo
export const UpdateTodoAction = async (
  formData: {
    title: string;
    description: string;
    priority: string;
  },
  todoId: string,
  pathToRevalidate: string
) => {
  await connect();

  try {
    await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
        },
      },
      {
        new: true,
      }
    );
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "Todo has been updated successfuly",
    };
  } catch (error) {
    console.error(error);
  }
};

// Delete Todo
export const DeleteTodoAction = async (
  todoId: string,
  pathToRevalidate: string
) => {
  await connect();

  try {
    await Todo.findByIdAndDelete(todoId);
    revalidatePath(pathToRevalidate);
    return { success: true, message: "Todo deleted successfully" };
  } catch (error) {
    console.error(error);
  }
};
