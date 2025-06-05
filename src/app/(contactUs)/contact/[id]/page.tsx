"use client";

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Sales from './component/sales';

const LoadingFallback = () => <div>Loading page content...</div>;

const DynamicPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  if (!id) {
    return <LoadingFallback />;
  }

  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        {/* {id === "feedback" && <Feedback />} */}
        {id === "sales" && <Sales />}
      </Suspense>
    </div>
  );
};

export default DynamicPage; 