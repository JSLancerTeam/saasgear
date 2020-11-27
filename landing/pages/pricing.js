import React, { useState } from 'react';
import cn from 'classnames';
import Layout from '../components/layout';

const plans = [
  {
    id: 'demo',
    name: 'Demo',
    price: 0,
    desc: 'Preview functionality right on this site',
    includeds: [
      'Free sign up.',
      'Test-drive features.',
      'Explore example gallery.',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 75,
    desc: 'Kickstart your project with all features and code',
    includeds: [
      'Save weeks of development time.',
      'Full source code download.',
      'Self-service documentation.',
      'Slack community support',
      'One year of product updates',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 295,
    desc: 'We help you get up and running even faster',
    includeds: [
      'Everything in the Starter plan.',
      'One-on-one onboarding and setup.',
      'Design consulting session with you/your team.',
      'Customized code working towards your MVP',
      'Production deployment to a VPS of your choice',
      'Automated server setup and deploy scripts',
    ],
  },
]

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Layout title="Pricing">
      <div className="p-8 text-center">
        <h1 className="font-bold text-5xl">Pricing Plans</h1>
        <p className="text-gray-700 text-lg mt-4">Start building for free, then add a site plan to go live. Account plans unlock additional features</p>
        <div className="bg-gray-200 p-1 w-auto inline-block rounded-lg mt-8">
          <button
            className={cn("px-10 py-2 rounded-lg bg-transparent outline-none focus:outline-none", {
              "bg-white": !isYearly
            })}
            onClick={() => setIsYearly(false)}
          >Monthly billing</button>
          <button
            className={cn("px-10 py-2 rounded-lg bg-transparent outline-none focus:outline-none", {
              "bg-white": isYearly
            })}
            onClick={() => setIsYearly(true)}
          >Yearly billing</button>
        </div>
        <div className="mt-10 flex flex-col md:flex-row justify-around">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={cn("border border-gray-300 rounded-md py-8 w-full md:w-3/12 text-left", {
                "mt-10 md:mt-0": index > 0
              })}
            >
              <div className="border-b border-gray-300 pb-6 px-8">
                <h4 className="text-2xl font-semibold">{plan.name}</h4>
                <p className="mt-3 text-gray-700">{plan.desc}</p>
                {plan.price > 0 ? (
                  <div className="my-5">
                    <span className="text-4xl font-bold">${isYearly ? plan.price * 9 : plan.price}</span>
                    <span>{isYearly ? '/year' : '/month'}</span>
                  </div>
                ) : (
                  <div className="my-5">
                    <span className="text-4xl font-bold">Free</span>
                  </div>
                )}
                {plan.price > 0 ? (
                  <button
                    onClick={() => window.location.href = `${process.env.appUrl}/auth/signup?plan=${plan.id}&isYearly=${isYearly ? 1 : 0}`}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg"
                  >Start 14 day trial</button>
                ) : (
                  <button
                    onClick={() => window.location.href = `${process.env.appUrl}/auth/signup`}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg"
                  >Try now</button>
                )}
              </div>
              <div className="px-8 mt-5">
                <h5 className="uppercase">What's included</h5>
                <ul>
                  {plan.includeds.map((included, index) => (
                    <li className="flex mt-4" key={index}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-teal-500 mr-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {included}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
};

export default Pricing;