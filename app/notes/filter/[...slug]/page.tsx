import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? 'All' : slug[0];

  return {
    title: `NoteHub - Notes tagged "${tag}"`,
    description: `Explore notes filtered by the tag "${tag}" in NoteHub. Find relevant and organized content easily.`,
    openGraph: {
      title: `NoteHub - Notes tagged "${tag}"`,
      description: `Explore notes filtered by the tag "${tag}" in NoteHub. Find relevant and organized content easily.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes tagged: ${tag}`,
        },
      ],
    },
  }
}

export default async function NotePage({params}: Props) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, tag}],
    queryFn: () => fetchNotes({ search: "", page: 1, tag }),
  });

  return (
    <div>
      <h1>Tasks page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes tag={tag} />
      </HydrationBoundary>
    </div>
  );
}