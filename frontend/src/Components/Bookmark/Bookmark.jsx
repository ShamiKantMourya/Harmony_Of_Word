import React from "react";
import { useSelector } from "react-redux";

import Post from "../Post/Post";

const Bookmark = () => {
  const { Bookmarks } = useSelector((state) => state.bookMark);
  console.log(Bookmarks, "bookmark post");
  return (
    <div className="user-post-section">
      {Bookmarks && Bookmarks.length > 0 ? (
        Bookmarks.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            caption={post.caption}
            location={post.location}
            postImage={post.image.url}
            likes={post.likes}
            comments={post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            isUserAccount={"user"} //newly added and set value into user
          />
        ))
      ) : (
        <p className="no-post-text">No Post added to bookmark</p>
      )}
    </div>
  );
};

export default Bookmark;
