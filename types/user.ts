import {  Tables, TablesInsert, TablesUpdate } from "@/types/supabase";

export type Users = Tables<"users">;
export type UserInsert = TablesInsert<"users">;
export type UserUpdate = TablesUpdate<"users">;