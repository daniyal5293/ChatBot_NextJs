// src/components/Header.tsx
"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


export default function Header() {
  const [user] = useAuthState(auth);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white text-black dark:bg-[#0a0a0a] dark:text-white transition-colors">
      <h1 className="text-xl font-bold">Welcome to My Chatbot</h1>
        
      {user ? (
        <div className="flex items-center gap-3">
          <p>{user.email}</p>
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
        >
          Login
        </button>
      )}
    </header>
  );
}
