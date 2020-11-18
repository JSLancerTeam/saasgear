import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useApolloNetworkStatus } from '@/app/apollo';

const loading = keyframes`
  0% {
		width: 0;
	}

	20% {
		width: 10%;
	}

	25% {
		width: 24%;
	}

	43% {
		width: 41%;
	}

	56% {
		width: 50%;
	}

	66% {
		width: 52%;
	}

	71% {
		width: 60%;
	}

	75% {
		width: 76%;
    
	}

	94% {
		width: 86%;
	}

	100% {
		width: 100%;
	}
`;

const ProgressBar = styled.div`
  overflow: hidden;
  width: 100%;
  position: absolute;
  z-index: 10;
`;

const Bar = styled.div`
  background: #fff;
`;

const Progress = styled.div`
  background: #0362fc;
  padding: 1px;
  width: 0;
  animation: ${loading} 3s ease infinite;
`;

function GlobalLoading() {
  const status = useApolloNetworkStatus();

  if (status.numPendingQueries > 0) {
    return (
      <ProgressBar>
        <Bar>
          <Progress />
        </Bar>
      </ProgressBar>
    );
  }
  return null;
}

export default GlobalLoading;
