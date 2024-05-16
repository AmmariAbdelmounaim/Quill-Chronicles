export default function Page({ params }: { params: { articleId: string } }) {
  return <div>My Post: {params.articleId}</div>;
}
