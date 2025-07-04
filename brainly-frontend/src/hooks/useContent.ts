import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// ✅ Your useContent.ts
export function useContent() {
  const [contents, setContents] = useState([]);

  async function refresh() {
    const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });

    setContents(res.data.content); // ✅ Make sure API returns "content"
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000); // Refresh every 5s (optional)
    return () => clearInterval(interval);
  }, []);

  return { contents, refresh }; // ✅ Object, not just array
}
