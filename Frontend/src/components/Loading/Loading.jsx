import React from 'react';
import { useLoading } from '../../hooks/useLoading';

export default function Loading() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div class="preload">
        <div class="preload-circle"></div>
        <p>Restaturant</p>
    </div>
  );
}
