import PostList from '@/components/PostList'
import { TagSlug } from '@/type/common'
import { API } from '@/util/API'

export default async function TagResult(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;

  const {
    tag
  } = params;

  return (
    <section className="w-full flex flex-col gap-4 items-center px-4 pt-4">
      <h1 className="font-bold text-2xl">Tag : {tag} </h1>
      <PostList tag={tag} />
    </section>
  )
}

export async function generateStaticParams() {
  const tags = await API.fetchTagsDataAll()
  return tags.map((tag: TagSlug) => ({
    slug: tag.tagName,
  }))
}
