import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useApolloNetworkStatus } from '@/config/apollo';
import { awaitSetTimeOut } from '@/utils/timer';

const loading = keyframes`
  0% {
		width: 0;
	}

	100% {
		width: 80%
	}
`;

const completing = keyframes`
  100% {
    width: 80%;
  }
`;

const completed = keyframes`
  0% {
		width: 80%;
	}

	100% {
		width: 100%;
	}
`;

const ProgressBar = styled.div`
  overflow: hidden;
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
`;

const Bar = styled.div`
  background: #fff;
`;

const Progress = styled.div`
  background: #0362fc;
  padding: 0px;
  width: 0;

  ${(props) =>
    props.loading &&
    css`
      padding: 1px;
      animation: ${loading} 4s ease;
    `}

  ${(props) =>
    props.completing &&
    css`
      padding: 1px;
      animation: ${completing} 0.3s ease;
    `}

  ${(props) =>
    props.completed &&
    css`
      padding: 1px;
      animation: ${completed} 0.3s ease;
    `}
`;

function GlobalLoading() {
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
    <ProgressBar>
      <Bar>
        <Progress
          loading={Number(isLoading)}
          completing={isCompleting}
          completed={isCompleted}
        />
      </Bar>
    </ProgressBar>
  );
}

export default GlobalLoading;
