import React, { Suspense } from "react";
import BlogHero from "@/components/BlogHero";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";

const loadBlogPostCached = React.cache(loadBlogPost);

export const generateMetadata = async ({ params }) => {
  const post = await loadBlogPostCached(params.postSlug);
  const {
    frontmatter: { title, abstract: description },
  } = post;
  return {
    title: `${title} | ${BLOG_TITLE}`,
    description,
  };
};

const Components = {
  CircularColorsDemo,
  DivisionGroupsDemo,
  pre: CodeSnippet,
};

function BlogPost({ params }) {
  return (
    <Suspense>
      <PostContents slug={params.postSlug} />
    </Suspense>
  );
}

async function PostContents({ slug }) {
  const post = await loadBlogPostCached(slug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={Components} />
      </div>
    </article>
  );
}

export default BlogPost;
