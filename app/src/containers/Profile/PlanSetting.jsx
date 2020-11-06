import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

function PlanSetting({ isActive }) {
  return (
    <div className={cn('p-4', isActive ? 'block' : 'hidden')}>
      <div className="py-4 w-full lg:w-1/2">
        <div className="flex flex-col">Plan</div>
      </div>
    </div>
  );
}

PlanSetting.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default PlanSetting;
