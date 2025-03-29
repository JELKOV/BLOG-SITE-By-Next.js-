import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  // 1. posts 디렉토리 내에 있는 모든 파일 이름을 배열로 읽어온다
  // 예: ['getting-started-nextjs.md', 'react-hooks.md', ...]
  const postFiles = getPostsFiles();

  // 2. 각 파일 이름에 대해 getPostData 함수를 호출해서
  //    해당 마크다운 파일의 메타데이터(title, date 등)와 내용을 추출한 객체 배열로 만든다
  // 결과 예:
  // [
  //   {
  //     slug: 'getting-started-nextjs',
  //     title: 'NextJS 시작하기',
  //     date: '2022-10-15',
  //     content: '... 마크다운 콘텐츠 ...'
  //   },
  //   ...
  // ]
  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  // 3. 게시물 배열을 날짜(date) 기준으로 최신 게시물이 위에 오도록 정렬
  // 날짜가 큰 것(더 최신)이 먼저 와야 하므로 a.date > b.date인 경우 a를 앞에 두도록 -1 반환
  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  // 4. 정렬된 게시물 목록 반환
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
