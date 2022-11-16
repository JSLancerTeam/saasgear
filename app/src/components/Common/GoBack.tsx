import React from 'react';
import { useHistory } from 'react-router-dom';
import goBackIcon from '@/assets/images/svg/back.svg';

type Props = {
  link?: string | null;
}

const GoBack: React.FC<Props> = ({ link }) => {
  const history = useHistory();

  function goBack() {
    if (link) {
      return history.push(link);
    }
    return history.goBack();
  }

  return (
    <div onClick={goBack} role='presentation' className='text-left mb-4 block cursor-pointer'>
      <img src={goBackIcon} alt="" />
    </div>
  );
}

export default React.memo(GoBack);
