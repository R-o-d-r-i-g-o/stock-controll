import { api } from "../api";
import * as t from "./_types";

// Note: GET operations (fetchUsersPaginated, getUserById, getRolesList) have been migrated to Server Actions
// See: app/api/_backend/features/user/user.actions.ts

// Creates a new user with the given request data.
const createUser = async (req: t.CreateNewUser) => {
  const res = await api.post<t.CreateNewUserResponse>("/api/users", req);
  return res.data;
};

// Updates an existing user by ID with the provided details.
const updateUser = async (req: t.UpdateUser) => {
  await api.put<null>(`/api/users/${req.id}`, {
    name: req.name,
    email: req.email,
    roleId: req.roleId,
    Password: req.password,
  });
};

// Deletes a user by their ID.
const deleteUser = async (id: number) => {
  await api.delete(`/api/users/${id}`);
};

export { createUser, updateUser, deleteUser };
