import React,  { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import StripeContainer from '@/containers/Stripe';

const plans = [
  {
    id: 'freelancer',
    name: 'Freelancer',
    desc: 'For solo user',
    price: 12,
  },
  {
    id: 'startup',
    name: 'Startup',
    desc: 'For small & medium bussinesses',
    price: 24,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'For large company',
    price: 48,
  }
]

const PlanSetting = ({ isActive }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [subChanged, setSubChanged] = useState('');

  function toggle() {
    setIsYearly(!isYearly);
  }

  function changeSub(name) {
    setSubChanged(name);
  }

  function createPaymentMethodSuccess(token) {
    console.log(token);
  }

  const currentPlan = {
    plan_name: 'startup',
    price: 24,
    type: 'monthly'
  }

  const planChanged = !!subChanged && plans.find(item => item.id === subChanged);

  return (
    <div className={cn('p-4', isActive ? 'block' : 'hidden')}>
      <div className="py-4 w-full">
        <div className="flex justify-center">
          <p className="font-bold mr-4">Bill Yearly</p>
          <div 
            className={cn("relative rounded-full w-12 h-6 cursor-pointer transition duration-200 ease-linear", isYearly ? 'bg-blue-500' : ' bg-gray-400')} 
            onClick={toggle} 
            aria-hidden
          >
            <label 
              htmlFor="toggle" 
              className={cn("absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer translate-x-0 border-gray-400", 
                isYearly ? 'translate-x-full border-blue-500' : 'translate-x-0 border-gray-400'
              )}
            >
              <input
                type="checkbox" id="toggle" name="toggle"
                className="appearance-none w-full h-full cursor-pointer active:outline-none focus:outline-none"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-around mt-8">
          {plans.map(plan => (
            <div
              className={cn("border border-gray-30 rounded-md pt-8 pb-4 px-4 w-full md:w-3/12 text-center", 
                {'bg-gray-50': planChanged && plan.id === planChanged.id }
              )} 
              key={plan.id}
            >
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="text-gray-700 mt-2">{plan.desc}</p>
              <div className="mt-8">
                <span className="font-bold text-4xl">${isYearly ? plan.price * 9 : plan.price}.00</span>
                <span>/{isYearly ? 'year' : 'month'}</span>
              </div>
              {(currentPlan.plan_name === plan.id && ((currentPlan.type === 'monthly' && !isYearly) || (currentPlan.type === 'yearly' && isYearly))) ? (
                <button disabled className="w-full cursor-default bg-blue-200 text-gray-600 py-2 rounded-md mt-8" type="button">Current plan</button>
              ) : (
                <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-8" type="button" onClick={() => changeSub(plan.id)}>Get started</button>
              )}
            </div>
          ))}
        </div>
        <div className="text-center font-semibold mt-4">
          <p>See plan details on <a className="text-blue-700" href={`${process.env.REACT_APP_LANDING_PAGE}/pricing`} target="_blank">Pricing page</a></p>
        </div>

        {planChanged && (
          <div className="border-t border-gray-300 mt-10 pt-10 grid grid-cols-3">
            <div className="w-full border-r border-gray-300">
              <div className="mb-4">
                <p>Current subcription</p>
                <span className="font-semibold">${currentPlan.price}.00</span>
              </div>
              <div className="mb-4">
                <p>New subcription</p>
                <span className="font-semibold">${isYearly ? planChanged.price * 9 : planChanged.price}.00</span>
              </div>
              <div className="mb-4">
                <p>Balance due right now</p>
                <span className="font-semibold">${Math.max((isYearly ? planChanged.price * 9 : planChanged.price) - currentPlan.price, 0)}.00</span>
              </div>
            </div>
            <div className="col-span-2">
              <StripeContainer 
                onSubmitSuccess={createPaymentMethodSuccess}
                className="w-6/12 mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PlanSetting.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default PlanSetting;
