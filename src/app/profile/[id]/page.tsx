export default function UserProfile({ params }: { params: { id: string } }) {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-3xl font-bold">Profile</h1>
			<p className="text-white">Profile page {params.id}</p>
		</div>
	);
}
