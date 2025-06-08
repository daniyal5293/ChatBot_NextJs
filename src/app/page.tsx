// src/app/page.tsx
import Chat from "@/components/chat";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black dark:bg-[#0a0a0a] dark:text-[#ededed]">
      
      <Chat/>
    </main>
 
  );
}
