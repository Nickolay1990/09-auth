import { fetchNoteById } from '@/lib/api/clientApi';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type NoteDetailsProps = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
	const { id } = await params;
	const parsedId = Number(id);
	const note = await fetchNoteById(parsedId);

	return {
		title: note.title,
		description: note.content.slice(0, 100),
		openGraph: {
			title: note.title,
			description: note.content.slice(0, 100),
			url: `https://08-zustand-beige.vercel.app/notes/${id}`,
			images: [
				{
					url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
					width: 1200,
					height: 630,
					alt: 'Note Details',
				},
			],
		},
	};
}

async function NoteDetails({ params }: NoteDetailsProps) {
	const queryClient = new QueryClient();

	const { id } = await params;
	const parsedId = Number(id);

	await queryClient.prefetchQuery({
		queryKey: ['note', parsedId],
		queryFn: () => fetchNoteById(parsedId),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	);
}

export default NoteDetails;
