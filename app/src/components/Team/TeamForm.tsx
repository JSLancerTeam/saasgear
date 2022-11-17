import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactHookFormType } from '@/typeReactHookForm';
import ErrorText from '../Common/ErrorText';
import Button from '../Common/Button';
import FormControl from '../Common/FormControl';
import Input from '../Common/Input/Input';

type Props = ReactHookFormType & {
  isEdit?: boolean;
  loading?: boolean;
}

const TeamForm: React.FC<Props> = ({
  onSubmit,
  register,
  formErrors,
  isEdit,
  loading,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 w-full block">
        <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block mb-[19px] uppercase">
          {t('Team.label.name')}
        </label>
        <FormControl>
          <Input
            type="text"
            placeholder={t('Team.placeholder.team_name')}
            name="teamName"
            ref={register}
          />
          {formErrors?.teamName?.message && (
            <ErrorText message={String(t(formErrors.teamName.message))} />
          )}
        </FormControl>
      </div>
      <div className="mb-4 w-full block">
        <label className="font-bold text-[12px] leading-[15px] tracking-[2px] text-white_blue mix-blend-normal opacity-90 block mb-[19px] uppercase">{t('Team.label.id')}</label>
        <FormControl>
          <Input
            type="text"
            placeholder={t('Team.placeholder.team_id')}
            name="teamID"
            ref={register}
          />
          {formErrors?.teamID?.message && (
            <ErrorText message={String(t(formErrors.teamID.message))} />
          )}
        </FormControl>
      </div>
      <div className="flex mt-[30px] [&_button:first-child]:mr-4 [&_button]:sm:w-full">
        <Button color="primary" type="submit" disabled={loading}>
          {isEdit ? t('Team.text.save') : t('Team.text.add')}
        </Button>
        <Button onClick={() => history.push('/teams')}>{t('Common.text.cancel')}</Button>
      </div>
    </form>
  );
}

export default TeamForm;