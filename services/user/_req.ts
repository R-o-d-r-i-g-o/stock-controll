import { api } from "../api";
import * as t from "./_types";

// Fetches a paginated list of users based on the given request parameters.
const fetchUsersPaginated = async (req: t.GetUsersPaginated) => {
  const res = await api.get<t.GetUsersPaginatedResponse>("/api/users", {
    params: req,
  });
  return res.data;
};

// Retrieves the list of available user roles.
const getRolesList = async () => {
  const res = await api.get<t.GetRolesListResponse>("/api/users/roles");
  return res.data;
};

// Fetches user details by a specific user ID.
const getUserById = async (id: number) => {
  const res = await api.get<t.GetUserByIdResponse>(`/api/users/${id}`);
  return res.data;
};

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

export {
  fetchUsersPaginated,
  getUserById,
  getRolesList,
  createUser,
  updateUser,
  deleteUser,
};
