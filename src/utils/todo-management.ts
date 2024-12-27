export const AddTodoFields = [
  {
    name: "title",
    type: "text",
    placeholder: "Enter title",
    label: "Title",
    required: true,
  },
  {
    name: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    required: true,
  },
  {
    name: "priority",
    type: "text",
    placeholder: "Enter priority",
    label: "Priority",
    required: true,
  },
];

export const initialFormState = {
  title: "",
  description: "",
  priority: "",
};
