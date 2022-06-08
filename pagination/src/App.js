import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Posts from "./Posts";

function App() {
  let [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [postPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5 text-dark">
      <div className="row">
        <div className="col">
          <Posts posts={currentPosts} loading={loading} />
          <Pagination
            postPerPage={postPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
