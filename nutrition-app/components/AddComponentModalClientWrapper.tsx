"use client";

import { AddComponentModal } from "./AddComponentModal";

export default function AddComponentModalClientWrapper({ mealId }: { mealId: number }) {
  return (
    <AddComponentModal
      mealId={mealId}
      onSubmit={() => {}}
    />
  );
} 