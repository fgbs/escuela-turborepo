
export default async function RecordingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      {children}
    </div>
  );
}