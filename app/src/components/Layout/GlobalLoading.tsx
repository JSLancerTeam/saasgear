import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useApolloNetworkStatus } from '@/config/apollo';
import { awaitSetTimeOut } from '@/utils/timer';

const GlobalLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const status = useApolloNetworkStatus();

  useEffect(() => {
    updateStatus();
  }, [status]);

  async function updateStatus() {
    if (status.numPendingMutations || status.numPendingQueries) {
      setIsLoading(true);
      setIsCompleted(false);
      setIsCompleting(false);
    } else if (isLoading) {
      setIsCompleting(true);
      await awaitSetTimeOut(300);
      setIsCompleted(true);
      await awaitSetTimeOut(300);
      setIsCompleted(false);
      setIsCompleting(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="overflow-hidden w-full fixed z-10 top-0">
      <div className="bg-white">
        <div
          className={cn("bg-[#0362fc] w-0 p-0", {
            'p-[1px]': isLoading || isCompleting || isCompleted,
            'animate-[loading_4s_ease]': isLoading,
            'animate-[completing_0.3s_ease]': isCompleting,
            'animate-[completed_0.3s_ease]': isCompleted,
          })}
        />
      </div>
    </div>
  );
}

export default GlobalLoading;
