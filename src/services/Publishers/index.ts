import http from "../api";
import type { Publisher } from "../../types";
import type { APIResponse } from "../types";

async function getPublisher() {
  return await http.get<APIResponse<Publisher[]>>("publishers");
}

async function postPublisher(publisher: Omit<Publisher, "id">) {
  return await http.post<APIResponse<Publisher[]>>("publishers", publisher);
}

export default {
  getPublisher,
  postPublisher,
};
