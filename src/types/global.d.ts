interface ClerkUserTypes {
  id: string | undefined;
  username: string | undefined | null;
  imageUrl: string | undefined;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  emailAddresses: string | undefined;
}

interface NavbarProps {
  clerkUserId: string | null;
  user: ClerkUserTypes;
}

interface CreateUserActionType {
  clerkId: string | undefined;
  username: string | undefined | null;
  email: string | null;
  photo: string | undefined;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
}

interface InitialFormType {
  title: string;
  description: string;
  priority: string;
}
