import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { COLORS } from '@/constants/style';
import { ReactComponent as CheckCircleIcon } from '@/assets/images/svg/check-circle.svg';
import Button from '../Common/Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Name = styled.h5`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${COLORS.SAPPHIRE_BLUE};
  margin-bottom: 6px;
`;

const Desc = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${COLORS.WHITE_BLUE};
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 24px 0;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 32px;
  line-height: 36px;
  color: ${COLORS.GREEN};
`;

const Unit = styled.span`
  font-size: 12px;
  line-height: 25px;
  color: ${COLORS.WHITE_GRAY};
  opacity: 0.9;
`;

const FeatureList = styled.ul`
  padding-top: 24px;
  padding-bottom: 32px;
  border-top: 1px solid #7c88b1;
  flex-grow: 1;
`;

const FeatureItem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  & + & {
    margin-top: 8px;
  }
`;

const FeatureText = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.WHITE_GRAY};
  margin-left: 12px;
`;

const GetStartedBtn = styled(Button)`
  width: 100%;
`;

const PlanWrapper = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  border: 1px solid #7c88b1;
  border-radius: 10px;
  padding: 24px;
  cursor: pointer;

  &:first-child {
    margin-right: 25px;
  }

  ${(props) =>
    props.active &&
    css`
      background: ${COLORS.PRIMARY};
      border-color: rgba(255, 255, 255, 0.2);

      ${Name}, ${Desc}, ${Price}, ${Unit}, ${FeatureText}, ${GetStartedBtn} {
        color: ${COLORS.WHITE};
      }

      ${Desc} {
        opacity: 0.7;
      }

      ${FeatureList} {
        border-color: rgba(255, 255, 255, 0.2);
      }

      ${FeatureItem} {
        svg {
          circle,
          path {
            stroke: #8dead2;
          }
        }
      }

      ${GetStartedBtn} {
        border-color: ${COLORS.WHITE};
        background: ${COLORS.PRIMARY};
      }
    `}
`;

const Plans = ({
  plans,
  onChange,
  planChanged,
  isYearly,
  checkIsCurrentPlan,
}) => {
  const [test, setTest] = useState(false);

  return (
    <Wrapper>
      {plans.map((plan) => (
        <PlanWrapper
          onClick={() => onChange(plan.id)}
          active={planChanged && plan.id === planChanged.id}
          key={plan.id}
        >
          <Name>{plan.name}</Name>
          <Desc>{plan.desc}</Desc>
          <PriceWrapper>
            <Price>${isYearly ? plan.price * 9 : plan.price}</Price>
            <Unit>/{isYearly ? 'year' : 'month'}</Unit>
          </PriceWrapper>
          <FeatureList>
            {plan.features.map((feature) => (
              <FeatureItem key={feature}>
                <CheckCircleIcon />
                <FeatureText>{feature}</FeatureText>
              </FeatureItem>
            ))}
          </FeatureList>
          {checkIsCurrentPlan(plan.id) ? (
            <GetStartedBtn>Current Plan</GetStartedBtn>
          ) : (
            <GetStartedBtn color="primary">Get Started</GetStartedBtn>
          )}
        </PlanWrapper>
      ))}
    </Wrapper>
  );
};

Plans.propTypes = {
  plans: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  checkIsCurrentPlan: PropTypes.func.isRequired,
  planChanged: PropTypes.object,
  isYearly: PropTypes.bool,
};

export default Plans;
