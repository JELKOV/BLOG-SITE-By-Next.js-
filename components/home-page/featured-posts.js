import classes from "./featured-posts.module.css";

function FeaturedPosts() {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={DUMMY_POSTS} />
    </section>
  );
}

export default FeaturedPosts;
