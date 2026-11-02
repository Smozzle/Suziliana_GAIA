import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({ user: false, posts: false });
  const [error, setError] = useState({ user: null, posts: null });

  // 1. Fetch user data when userId changes
  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    const abortController = new AbortController();

    const fetchUser = async () => {
      setLoading((prev) => ({ ...prev, user: true }));
      setError((prev) => ({ ...prev, user: null }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fixed string interpolation with backticks
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((prev) => ({ ...prev, user: err.message }));
        }
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }
    };

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  // 2. Fetch user posts when user state changes
  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }

    const abortController = new AbortController();

    const fetchPosts = async () => {
      setLoading((prev) => ({ ...prev, posts: true }));
      setError((prev) => ({ ...prev, posts: null }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const response = await fetch(`/api/users/${user.id}/posts`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const postsData = await response.json();
        setPosts(postsData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((prev) => ({ ...prev, posts: err.message }));
        }
      } finally {
        setLoading((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, [user]);

  // 3. Update page title when user changes
  useEffect(() => {
    if (user) {
      document.title = `Profile: ${user.name}`;
    } else {
      document.title = "User Profile";
    }

    return () => {
      document.title = "React App";
    };
  }, [user]);

  // 4. Mock API setup for development demo
  useEffect(() => {
    const mockUsers = {
      1: { id: 1, name: "John Doe", email: "john@example.com", avatar: "avatar1.jpg" },
      2: { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "avatar2.jpg" },
    };

    const mockPosts = {
      1: [
        { id: 1, title: "My First Post", content: "Hello world!", date: "2024-01-15" },
        { id: 2, title: "React Tips", content: "useEffect is powerful!", date: "2024-01-16" },
      ],
      2: [
        { id: 3, title: "JavaScript Tricks", content: "Async/await is great!", date: "2024-01-17" },
      ],
    };

    const originalFetch = window.fetch;

    window.fetch = async (url, options) => {
      if (options?.signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      // Match user posts endpoint
      if (url.includes("/posts")) {
        const userId = parseInt(url.split("/")[3]);
        const posts = mockPosts[userId] || [];
        return { ok: true, json: async () => posts };
      }

      // Match user profile endpoint
      if (url.includes("/api/users/")) {
        const userId = parseInt(url.split("/")[3]);
        const user = mockUsers[userId];

        if (user) {
          return { ok: true, json: async () => user };
        } else {
          return { ok: false, status: 404 };
        }
      }

      return originalFetch(url, options);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // Corrected conditional view check
  if (!userId) {
    return (
      <div className="user-profile">
        <p>Please select a user to view their profile.</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>{loading.user ? "Loading user..." : user?.name}</h2>
      {error.user && <p className="error">{error.user}</p>}

      <h3>Posts</h3>
      {loading.posts ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserProfile;