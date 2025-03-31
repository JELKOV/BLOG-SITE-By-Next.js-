import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Image from "next/image";

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // react-markdown에서 특정 요소(p, code 등)의 렌더링 방식을 오버라이드
  const customRenderers = {
    // 단락 요소 <p> 커스텀: 이미지가 포함되어 있다면 별도로 처리
    p(paragraph) {
      const { node } = paragraph;

      // 단락 내 첫 번째 자식이 이미지 태그인 경우
      if (node.children[0]?.tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt || "포스트 이미지"}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        );
      }

      // 그 외 일반 단락 텍스트는 그대로 출력
      return <p>{paragraph.children}</p>;
    },

    // 코드 블록 커스텀
    code({ className, children }) {
      const language = className?.split("-")[1] || "javascript"; // 기본값 설정

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          wrapLongLines
        >
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
