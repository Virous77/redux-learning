import React from "react";
import Counter from "./Components/Counter";
import CreatePost from "./Components/CreatePost";
import PostList from "./Components/PostList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SinglePost from "./Components/SinglePost";
import EditPost from "./Components/EditPost";

function App() {
  const HomeLayout = () => {
    return (
      <>
        {/* <Counter /> */}
        <CreatePost />
        <PostList />
      </>
    );
  };

  return (
    <main className="App">
      <BrowserRouter>
        <p>
          <Link to="/">Home</Link>
        </p>

        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
