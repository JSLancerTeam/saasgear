import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export function usePortal(id) {
  const rootElemRef = useRef(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement();

    if (!existingParent) {
      addRootElement(parentElem);
    }

    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      rootElemRef.current.remove();
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, []);

  function createRootElement() {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
  }

  function addRootElement(rootElem) {
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild.nextElementSibling,
    );
  }

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }
  return getRootElem();
}

export default function Portal({ id, children }) {
  const target = usePortal(id);
  return createPortal(children, target);
}

Portal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
