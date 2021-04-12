const { useEffect } = require('react');

const useDocumentHeader = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentHeader;
