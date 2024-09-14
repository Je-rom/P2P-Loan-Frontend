import axiosConfig from "../config/axios";
import { AxiosResponse } from "axios";

export interface ChatHistoryItem {
  role: string;
  content: string;
}

export interface Chat {
  chatHistory: ChatHistoryItem[];
  newMessage: string;
}

export interface GetAllChatsResponse {
  chats: Chat[];
}

export interface ChatRequest {
  newMessage: string;
  chatHistory: ChatHistoryItem[];
}

type ChatDetail = {
  chat: Chat;
};

type ChatDetailResponse = {
  chat: ChatDetail;
};

class ChatService {
  async createChat(data: ChatRequest): Promise<AxiosResponse<string>> {
    return axiosConfig.post("/api/ai/ai-chat-bot", data);
  }

  // async getAllChats(): Promise<AxiosResponse<GetAllChatsResponse>> {
  // return axiosConfig.get("/api/ai/ai-chat-bot");
  // }

  // async getChatById(id: string): Promise<AxiosResponse<ChatDetailResponse>> {
  // return axiosConfig.get(`/chats/${id}`);
  // }
}

export default new ChatService();