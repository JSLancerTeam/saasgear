import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../Common/Button';

const EmptyTeam: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className="flex">
      <div className='flex-grow'>
        <p className="text-[16px] leading-[26px] text-white_gray mb-[14px]">{t('Team.text.click_button')}</p>
        <Button color="primary" onClick={() => history.push('/teams/new')}>
          {t('Team.text.create')}
        </Button>
      </div>
    </div>
  );
}

export default EmptyTeam
