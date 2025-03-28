import AllPosts from "../../components/posts/all-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS는 프로덕션용 React 프레임워크 - 풀스택 React 앱과 사이트를 서버 사이드 렌더링을 통해 쉽게 만들 수 있다",
    date: "2025-03-25",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS는 프로덕션용 React 프레임워크...",
    date: "2025-03-25",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS는 프로덕션용 React 프레임워크...",
    date: "2025-03-25",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS는 프로덕션용 React 프레임워크...",
    date: "2025-03-25",
  },
];

function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
