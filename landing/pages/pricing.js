import React, { useState } from 'react';
import cn from 'classnames';
import Layout from '../components/layout';

const plans = [
  {
    id: 'freelancer',
    name: 'Freelancer',
    price: 12,
    desc: 'All the basics for starting a new business',
    includeds: [
      'Potenti felis, in cras at at ligula nunc.',
      'Orci neque eget pellentesque.',
      'Donec mauris sit in eu tincidunt etiam.',
    ],
  },
  {
    id: 'startup',
    name: 'Startup',
    price: 24,
    desc: 'All the basics for starting a new business',
    includeds: [
      'Potenti felis, in cras at at ligula nunc.',
      'Orci neque eget pellentesque.',
      'Donec mauris sit in eu tincidunt etiam.',
      'Faucibus volutpat magna',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 48,
    desc: 'All the basics for starting a new business',
    includeds: [
      'Potenti felis, in cras at at ligula nunc.',
      'Orci neque eget pellentesque.',
      'Donec mauris sit in eu tincidunt etiam.',
      'Faucibus volutpat magna',
      'Id sed tellus in varius quisque',
      'Risus egestas faucibus',
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
                <h4 className="text-xl">{plan.name}</h4>
                <p className="mt-3 text-gray-700">{plan.desc}</p>
                <div className="my-5">
                  <span className="text-4xl font-bold">${isYearly ? plan.price * 9 : plan.price}</span>
                  <span>{isYearly ? '/year' : '/month'}</span>
                </div>
                <button
                  onClick={() => window.location.href = `${process.env.appUrl}/signup?plan=${plan.id}&isYearly=${isYearly ? 1 : 0}`}
                  className="w-full bg-gray-800 text-white py-2 rounded-lg"
                >Start 14 day trial</button>
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