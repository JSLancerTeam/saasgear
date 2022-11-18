import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactHookFormType } from '@/typeReactHookForm';
import { ReactComponent as EnvelopeIcon } from '@/assets/images/svg/envelope.svg';
import FormControl from '../Common/FormControl';
import ErrorText from '../Common/ErrorText';
import Input from '../Common/Input/Input';
import Button from '../Common/Button';

type Props = ReactHookFormType & {
  apiError?: string;
  isSubmiting?: boolean;
}

const InviteMemberForm: React.FC<Props> = ({
  onSubmit,
  register,
  formErrors,
  apiError,
  isSubmiting,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full block mb-4">
        <FormControl className="flex">
          <Input
            type="text"
            placeholder={t('Common.placeholder.g_email')}
            name="emailMember"
            className="w-[300px] rounded-tr-none rounded-br-none border-r-0 sm:w-full"
            ref={register}
          />
          <Button
            type="submit"
            color="primary"
            disabled={isSubmiting}
            className="flex rounded-tl-none rounded-bl-none items-center [&_svg]:mr-[10px] [&_svg_*[fill]]:fill-white [&_svg_*[stroke]]:stroke-white"
          >
            <EnvelopeIcon />
            <span>{t('Team.text.invite')}</span>
          </Button>
        </FormControl>
        {formErrors?.emailMember?.message && (
          <ErrorText message={String(t(formErrors.emailMember.message))} />
        )}
        {apiError && <ErrorText message={apiError} />}
      </div>
    </form>
  );
};
export default InviteMemberForm;
