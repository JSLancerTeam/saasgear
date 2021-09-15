import { useEffect } from 'react';

type Props = {
  title: string;
}

const useDocumentHeader = ({ title }: Props): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentHeader;
