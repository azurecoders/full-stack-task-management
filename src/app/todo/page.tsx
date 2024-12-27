"use client";

import {
  CreateTodoAction,
  DeleteTodoAction,
  FetchUserTodosAction,
  UpdateTodoAction,
} from "@/actions";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddTodoFields, initialFormState } from "@/utils/todo-management";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const Todo = () => {
  const { user } = useUser();

  type Todos = {
    _id: string | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
    priority: string | null | undefined;
  };

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<InitialFormType>(initialFormState);
  const [todos, setTodos] = useState<Todos[]>([
    {
      _id: "",
      title: "",
      description: "",
      priority: "",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editedID, setEditedID] = useState<null | string>(null);

  const fetchUserTodos = async () => {
    try {
      setLoading(true);
      if (!user?.publicMetadata?.id) return;

      const response = await FetchUserTodosAction(
        user.publicMetadata.id as string
      );
      if (response?.success) {
        setLoading(false);
        setTodos(response?.todo);
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDeleteTodoAction = async (TodoId: string) => {
    const response = await DeleteTodoAction(TodoId, "/todo");
    if (response?.success) {
      await fetchUserTodos();
      console.log(response.message);
    }
  };

  const handleCreateTodoAction = async () => {
    const response =
      editedID !== null
        ? await UpdateTodoAction(formData, editedID, "/todo")
        : await CreateTodoAction(
            formData,
            user?.publicMetadata?.id as string,
            "/todo"
          );
    if (response?.success) {
      setIsDialogOpen(false);
      setFormData(initialFormState);
      setEditedID(null);
      await fetchUserTodos();
    }
  };

  interface EditTodoFormDataType {
    _id: string;
    title: string;
    description: string;
    priority: string;
  }

  const handleEditTodoAction = async (todo: EditTodoFormDataType) => {
    setFormData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    });
    setIsDialogOpen(true);
    setEditedID(todo._id);
  };

  useEffect(() => {
    fetchUserTodos();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="container mx-auto p-4 my-5">
      <div className="flex space-x-4 items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold">Manage Your Todos</h3>
          <p className="text-gray-600">
            Manage your todos here and get things done!
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Todo
        </Button>

        <Dialog
          open={isDialogOpen}
          onOpenChange={() => {
            setIsDialogOpen(false);
            setEditedID(null);
            setFormData(initialFormState);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editedID ? "Edit" : "Add"} Your Todo</DialogTitle>
              <DialogDescription>
                Make sure to fill out all the fields.
              </DialogDescription>
            </DialogHeader>
            <form action={handleCreateTodoAction} className="grid gap-4 py-4">
              {AddTodoFields.map((field) => (
                <div
                  key={field.name}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={field.name} className="text-right">
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof InitialFormType] || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        [field.name]: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              ))}
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todos && todos?.length > 0 ? (
            todos?.map((todo: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {todo.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {todo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="border border-black rounded w-fit py-1 px-3">
                    {todo.priority}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={() => handleEditTodoAction(todo)}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteTodoAction(todo._id)}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <h3 className="text-2xl font-bold">No Todos Found</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default Todo;
