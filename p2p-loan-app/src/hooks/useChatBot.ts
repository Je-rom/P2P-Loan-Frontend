import { useMutation, useQuery } from "@tanstack/react-query";
import chatService, { ChatRequest } from "../services/chatService";

export const useChat = () => {
  // const getChatQuery = useQuery({
  // queryKey: ["chats"],
  // queryFn: async () => {
  // const response = await chatService.getAllChats();
  // return response.data;
  // },
  // });

  const createChatMutation = useMutation({
    mutationFn: async (data: ChatRequest) => {
      const response = await chatService.createChat(data);
      console.log("AI Response:", response.data); // Debugging log
      return response.data;
    },
  });

  return {
    // getChatQuery,
    createChatMutation,
  };
}