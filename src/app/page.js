import React, { Suspense } from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

export const metadata = {
  title: BLOG_TITLE,
};

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      <Suspense>
        <BlogSummaryList />
      </Suspense>
    </div>
  );
}

async function BlogSummaryList() {
  const posts = await getBlogPostList();

  return (
    <>
      {posts.map((post) => {
        return (
          <BlogSummaryCard
            key={post.key}
            slug={post.slug}
            title={post.title}
            abstract={post.abstract}
            publishedOn={post.publishedOn}
          />
        );
      })}
    </>
  );
}

export default Home;
