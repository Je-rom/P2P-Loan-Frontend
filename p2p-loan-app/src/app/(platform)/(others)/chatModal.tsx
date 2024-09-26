// import React, { useState } from "react";
// import { useChat } from "../../../hooks/useChatBot";
// import { Send } from "lucide-react";
// import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
// import { useAuthState } from "../../../store/authStore";
// import { ChatHistoryItem } from "../../../services/chatService";

// interface ChatModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
//   const [newMessage, setNewMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const { createChatMutation } = useChat();
//   const { user } = useAuthState();

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== "") {
//       const userMessage = { role: "user", content: newMessage };

//       // Update chat history with user's message
//       setChatHistory((prev) => [...prev, userMessage]);

//       setIsLoading(true);

//       // Trigger chat mutation to send message
//       createChatMutation.mutate(
//         {
//           newMessage,
//           chatHistory: [...chatHistory],
//         },
//         {
//           onSuccess: (data) => {
//             console.log("Mutation Success:", data);
//             const aiMessage: ChatHistoryItem = {
//               role: "assistant",
//               content: data,
//             };
//             setChatHistory((prev) => [...prev, aiMessage]);
//             console.log("Updated Chat History:", chatHistory);
//           },
//           onError: (error) => {
//             console.error("Error sending message:", error);

//             // Set loading state to false on error
//             setIsLoading(false);
//           },
//         }
//       );

//       // Clear the message input
//       setNewMessage("");
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-md w-full max-w-3xl h-[80vh] flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">BorrowHub</h2>
//           <button onClick={onClose} className="text-red-500">
//             Close
//           </button>
//         </div>

//         <div className="chat-history overflow-y-auto flex-grow mb-4">
//           {chatHistory.map((message, index) => (
//             <div
//               key={index}
//               className={`mb-2 flex items-center ${
//                 message.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               {message.role === "assistant" && (
//                 <Avatar className="mr-2 bg-white p-1">
//                   <AvatarFallback className="bg-sky-50 text-white">
//                     A
//                   </AvatarFallback>
//                 </Avatar>
//               )}

//                {isLoading && (
//                   <div className="flex justify-start mb-2">
//                     <p className="p-2 rounded-md mx-2 bg-gray-200">......</p>
//                   </div>
//                 )}
//               <p
//                 className={`p-2 rounded-md mx-2 ${
//                   message.role === "user" ? "bg-blue-100" : "bg-gray-200"
//                 }`}
//               >
//                 {message.content}
//               </p>
//               {message.role === "user" && (
//                 <Avatar className="ml-2 bg-white p-1">
//                   <AvatarFallback className="bg-green-500 text-white">
//                     {user?.firstName?.charAt(0).toUpperCase() || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-grow p-2 border border-gray-300 rounded-md"
//             placeholder="Type here to chat with me..."
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-2 bg-sky-500 text-white p-2 rounded-md flex items-center justify-center"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatModal;

import React, { useState } from 'react';
import { useChat } from '../../../hooks/useChatBot';
import { Send, SidebarClose } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { useAuthState } from '../../../store/authStore';
import { ChatHistoryItem } from '../../../services/chatService';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for assistant's response
  const { createChatMutation } = useChat();
  const { user } = useAuthState();

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const userMessage = { role: 'user', content: newMessage };

      // Update chat history with user's message
      setChatHistory((prev) => [...prev, userMessage]);

      // Set loading state to true to show assistant's loading message
      setIsLoading(true);

      // Trigger chat mutation to send message
      createChatMutation.mutate(
        {
          newMessage,
          chatHistory: [...chatHistory],
        },
        {
          onSuccess: (data) => {
            console.log('Mutation Success:', data);
            const aiMessage: ChatHistoryItem = {
              role: 'assistant',
              content: data,
            };
            setChatHistory((prev) => [...prev, aiMessage]);

            // Set loading state to false after receiving the assistant's response
            setIsLoading(false);
          },
          onError: (error) => {
            console.error('Error sending message:', error);

            // Set loading state to false in case of error
            setIsLoading(false);
          },
        },
      );

      // Clear the message input
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center z-[999999999]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
      <div className="bg-white p-6 rounded-md w-full max-w-3xl h-[80vh] flex flex-col z-50">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">BorrowHub</h2>
            <p>
              Welcome to BorrowHub AI assistant! How can I assist you today?
            </p>
          </div>

          <button onClick={onClose} className="text-red-500">
            <SidebarClose />
          </button>
        </div>

        <div className="chat-history overflow-y-auto flex-grow mb-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-7 flex items-start ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="mr-2 bg-white p-1">
                  <AvatarFallback className="bg-sky-500 text-white">
                    BH
                  </AvatarFallback>
                </Avatar>
              )}
              <p
                className={`p-2 rounded-md mx-2 ${
                  message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'
                }`}
              >
                {message.content}
              </p>
              {message.role === 'user' && (
                <Avatar className="ml-2 bg- p-1">
                  <AvatarFallback className="bg-sky-500 text-white">
                    {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Show loading dots only in assistant's message area */}
          {isLoading && (
            <div className="flex justify-start mb-2">
              <p className="p-2 rounded-md mx-2 bg-gray-200">......</p>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border border-gray-300 rounded-md"
            placeholder="Type here to chat with me..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-sky-500 text-white p-2 rounded-md flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
