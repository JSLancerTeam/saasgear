const { useEffect } = require('react');

const useDocumentHeader = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

export default useDocumentHeader;
