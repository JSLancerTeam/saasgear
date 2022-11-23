import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function usePortal(id: string): HTMLDivElement {
  const rootElemRef = useRef<HTMLElement>(null) as React.MutableRefObject<HTMLDivElement>;
  
  // as 
  useEffect(() => {
    const existingParent: (HTMLDivElement | null) = document.querySelector(`#${id}`);
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

  function addRootElement(rootElem: HTMLDivElement) {
    document.body.insertBefore(
      rootElem,
      document?.body?.lastElementChild?.nextElementSibling ?? null
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

type Props = {
  id: string;
  children: React.ReactNode | React.ReactNode[];
}

export default function Portal({ id, children }: Props): React.ReactPortal {
  const target = usePortal(id);
  return createPortal(children, target);
}
