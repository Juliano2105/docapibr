export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-accent border-t-transparent" />
    </div>
  );
}
