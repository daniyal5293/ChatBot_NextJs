"use client";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchResponse = async (question: string) => {
    setQuery(question);
    setLoading(true);
    setResponse("");
    setSuggestions([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });

      const data = await res.json();
      setResponse(data.response);
      setSuggestions(data.suggestions || []);
    } catch {
      setResponse("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchResponse(query);
    setQuery("");//i am ensuring here that query field is empty afterr ENTER
  };

  const handleSuggestionClick = (text: string) => {
    fetchResponse(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg bg-white dark:bg-black dark:text-white flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto mb-4">
        {response && (
          <>
            <p className="font-semibold mb-2">Response:</p>
            <div className="bg-gray-100 dark:bg-zinc-800 p-3 rounded relative">
              <TypeAnimation
                sequence={[response]}
                wrapper="p"
                cursor={true}
                speed={85}
                style={{ whiteSpace: "pre-line" }}
              />
              <button
                onClick={handleCopy}
                className="absolute bottom-2 right-2 text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold mb-2">Suggestions:</p>
                <ul className="list-disc list-inside space-y-1">
                  {suggestions.map((sug, i) => (
                    <li
                      key={i}
                      className="cursor-pointer text-blue-600 hover:underline"
                      onClick={() => handleSuggestionClick(sug)}
                    >
                      {sug}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 p-2 rounded border dark:bg-zinc-800"
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "..." : "Ask"}
        </button>
      </form>
    </div>
  );

}
