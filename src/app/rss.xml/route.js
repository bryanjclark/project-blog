import RSS from "rss";

import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

export async function GET() {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });

  const allPosts = await getBlogPostList();
  const domain = "my-blog.com";

  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      url: `https://${domain}/posts/${post.slug}`,
      description: post.content,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
