"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => (href ? router.push(href) : router.back())}
      className="mr-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
      type="button"
    >
      <span className="mr-1">←</span> Back
    </button>
  );
} 