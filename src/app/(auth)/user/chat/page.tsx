/* eslint-disable @next/next/no-img-element */
// src/components/ui/Chat/SimpleChat.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  MoreVertical,
  Smile,
  Paperclip,
  Phone,
  Video,
  ChevronLeft,
  Mic,
  Camera,
  Check,
  CheckCheck,
  MicOff,
} from "lucide-react";
// import EmojiPicker from "emoji-picker-react";
type EmojiData = { emoji: string };
type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: number;
  fileUrl?: string | null; // Optional fileUrl property
  messageType: "text" | "image" | "voiceUrl" | "videoUrl" | "docUrl"; // New property added
  status?: "seen" | "delivered" | "sent"; // Add status property
  audioUrl?: string | null; // Optional audioUrl property
};
const messagesData: Message[] = [
  {
    id: 1,
    text: "Hey! How's it going?",
    sender: "other",
    timestamp: 1672531200000,
    fileUrl: null,
    messageType: "text",
  },
  {
    id: 2,
    text: "I'm good! What about you?",
    sender: "me",
    timestamp: 1672617600000,
    fileUrl: null,
    messageType: "text",
  },
  {
    id: 3,
    text: "Same here. Just chilling!",
    sender: "other",
    timestamp: 1672617600000,
    fileUrl: null,
    messageType: "text",
  },
];
export default function ChatScreen() {
  const [messages, setMessages] = useState(messagesData);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isVideoCall, setIsVideoCall] = useState<boolean>(false);
  const [inVideoCall, setInVideoCall] = useState<boolean>(false);
  const [inPhoneCall, setInPhoneCall] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0); // Timer state
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState<number>(0); // New state for recording time
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);
  const sendMessage = () => {
    if (!input && !audioURL) return; // Prevent sending if input is null or empty

    const newMessage: Message = {
      id: Date.now(),
      text: audioURL ? "Voice message" : input,
      sender: "me",
      timestamp: Date.now(),
      audioUrl: audioURL,
      messageType: audioURL ? "voiceUrl" : "text", // Updated to include messageType
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setAudioURL(null); // This is now valid
    setShowEmojiPicker(false);
  };
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long" as "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const addEmoji = (emoji: EmojiData) => {
    setInput((prev) => prev + emoji.emoji);
  };
  const startRecording = async () => {
    try {
      if (mediaRecorderRef.current) return; // Prevent multiple recordings

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      audioChunksRef.current = []; // Reset previous recordings
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
      setRecordingTime(0); // Reset recording time
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1); // Increment recording time every second
      }, 1000);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setRecording(false);
        if (timerRef.current) clearInterval(timerRef.current); // Stop the recording timer
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };
  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      peerConnection.current = new RTCPeerConnection();
      stream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, stream);
      });
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the candidate to the remote peer
          console.log("New ICE candidate:", event.candidate);
        }
      };
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      // Send the offer to the remote peer
      console.log("Offer sent:", offer);
      setInVideoCall(true);
      setInPhoneCall(false); // Ensure phone call state is false
      startCallTimer(); // Start the timer for video call
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };
  const startPhoneCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Here you would typically set up a connection to a VoIP service
      console.log("Phone call started");
      setInPhoneCall(true);
      setInVideoCall(false); // Ensure video call state is false
      startCallTimer(); // Start the timer for phone call
    } catch (error) {
      console.error("Error starting phone call:", error);
    }
  };
  const startCallTimer = () => {
    setCallDuration(0); // Reset the timer
    if (timerRef.current) clearInterval(timerRef.current); // Clear any existing timer
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1); // Increment the timer every second
    }, 1000);
  };
  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setInVideoCall(false);
    setInPhoneCall(false);
    if (timerRef.current) clearInterval(timerRef.current); // Stop the timer
    // Send the call duration as a message
    const durationMessage = `Call Duration: ${formatDuration(callDuration)}`;
    const newMessage: Message = {
      id: Date.now(),
      text: durationMessage,
      sender: "me",
      timestamp: Date.now(),
      messageType: "text", // Add messageType property
    };
    setMessages((prev) => [...prev, newMessage]); // Add the duration message to chat
    setCallDuration(0); // Reset call duration
  };
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // Cleanup timer on unmount
    };
  }, []);
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`; // Format as MM:SS
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.style.position = "fixed";
      videoElement.style.top = "0";
      videoElement.style.left = "0";
      videoElement.style.width = "100vw";
      videoElement.style.height = "100vh";
      videoElement.style.objectFit = "cover";
      videoElement.style.zIndex = "1000";

      const captureButton = document.createElement("button");
      captureButton.innerText = "Capture";
      captureButton.style.position = "fixed";
      captureButton.style.bottom = "20px";
      captureButton.style.left = "50%";
      captureButton.style.transform = "translateX(-50%)";
      captureButton.style.padding = "10px 20px";
      captureButton.style.background = "#075e54";
      captureButton.style.color = "white";
      captureButton.style.border = "none";
      captureButton.style.borderRadius = "5px";
      captureButton.style.cursor = "pointer";
      captureButton.style.zIndex = "1001";

      document.body.appendChild(videoElement);
      document.body.appendChild(captureButton);

      captureButton.addEventListener("click", async () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const fileUrl = URL.createObjectURL(blob);
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  text: "Photo",
                  sender: "me",
                  timestamp: Date.now(),
                  fileUrl,
                  messageType: "image", // Add the messageType property
                },
              ]);
            }
          }, "image/png");
        }

        stream.getTracks().forEach((track) => track.stop());
        document.body.removeChild(videoElement);
        document.body.removeChild(captureButton);
      });
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileUrl = URL.createObjectURL(file);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Photo",
            sender: "me",
            timestamp: Date.now(),
            fileUrl,
            messageType: "image", // Add the messageType property
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-[#ece5dd]">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-[#075e54] text-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <ChevronLeft className="cursor-pointer" />
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <span className="font-semibold">John Doe</span>
        </div>
        <div className="flex gap-4">
          <Phone className="cursor-pointer" onClick={startPhoneCall} />
          <Video className="cursor-pointer" onClick={startVideoCall} />
          <MoreVertical className="cursor-pointer" />
        </div>
      </div>

      {/* Call Timer in Chat Section */}
      {(inVideoCall || inPhoneCall) && (
        <div className="text-center text-lg p-2 bg-gray-200">
          Call Duration: {formatDuration(callDuration)}
        </div>
      )}
      {/* Video Call Section */}
      {inVideoCall && (
        <div className="flex flex-col items-center">
          <video ref={localVideoRef} autoPlay muted className="w-1/2" />
          <video ref={remoteVideoRef} autoPlay className="w-1/2" />
          <button
            onClick={endCall}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            End Video Call
          </button>
        </div>
      )}
      {/* Phone Call Section */}
      {inPhoneCall && (
        <div className="flex flex-col items-center">
          <p className="text-lg">In a Phone Call...</p>
          <button
            onClick={endCall}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            End Phone Call
          </button>
        </div>
      )}
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((msg, index) => (
          <div key={msg.id} className="flex flex-col items-center w-full">
            {index === 0 ||
            formatDate(messages[index - 1].timestamp) !==
              formatDate(msg.timestamp) ? (
              <div className="text-center bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-lg my-2">
                {formatDate(msg.timestamp)}
              </div>
            ) : null}
            <div
              className={`flex w-full my-1 ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-[75%] p-3 rounded-lg text-sm leading-tight shadow-md ${
                  msg.sender === "me"
                    ? "bg-[#dcf8c6] text-gray-800 rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.messageType === "image" && msg.fileUrl ? (
                  <img src={msg.fileUrl} alt="Uploaded" className="w-full" />
                ) : msg.messageType === "voiceUrl" && msg.audioUrl ? (
                  <audio controls src={msg.audioUrl}></audio>
                ) : (
                  <p className="text-txtBlack font-medium text-15 font-pathway max-w-sm">
                    {msg.text}
                  </p>
                )}
                <span className="text-right text-xs text-gray-600 mt-1 flex items-center">
                  {formatTime(msg.timestamp)}
                  {msg.sender === "me" &&
                    (msg.status === "seen" ? (
                      <CheckCheck className="text-blue-500 ml-1" size={14} />
                    ) : msg.status === "delivered" ? (
                      <CheckCheck className="ml-1" size={14} />
                    ) : (
                      <Check className="ml-1" size={14} />
                    ))}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4">
          {/* <EmojiPicker onEmojiClick={addEmoji} /> */}
        </div>
      )}
      {/* Message Input */}
      <div className="flex items-center p-3 bg-white shadow-md border-t border-gray-300 relative">
        <Smile
          className="text-gray-500 mx-2 cursor-pointer"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
        <label htmlFor="file-upload">
          <Paperclip className="text-gray-500 mx-2 cursor-pointer" />
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".doc,.png,.svg"
          onChange={handleFileUpload}
        />
        <Camera
          className="text-gray-500 mx-2 cursor-pointer"
          onClick={openCamera}
        />
        <button
          onClick={recording ? stopRecording : startRecording}
          className="text-gray-500 mx-2 cursor-pointer"
        >
          {recording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        {recording ? (
          <span className="text-gray-500 mx-2 flex-1 p-2 border border-gray-300 rounded-full w-full">
            Recording Time: {formatDuration(recordingTime)}{" "}
            {/* Display recording time */}
          </span>
        ) : (
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        )}

        <button
          onClick={() => sendMessage()}
          className="ml-2 p-2 bg-[#075e54] text-white rounded-full"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
