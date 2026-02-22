import { useState } from "react";
import PostsComponent from "./components/PostsComponent";

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <div>
      <button onClick={() => setShowPosts(!showPosts)}>
        Toggle Posts Component
      </button>

      {showPosts && <PostsComponent />}
    </div>
  );
}

export default App;
