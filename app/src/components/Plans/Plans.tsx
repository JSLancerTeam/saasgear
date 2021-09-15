import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, mobileQuery } from '@/constants/style';
import { ReactComponent as CheckCircleIcon } from '@/assets/images/svg/check-circle.svg';
import Button from '../Common/Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  ${mobileQuery} {
    flex-direction: column;
  }
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

const FeatureIcon = styled.span`
  width: 16px;
  height: 16px;
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

const PlanWrapper = styled.div<{ active: boolean }>`
  width: 430px;
  display: flex;
  flex-direction: column;
  border: 1px solid #7c88b1;
  border-radius: 10px;
  padding: 24px;
  cursor: pointer;

  &:first-child {
    margin-right: 25px;
    ${mobileQuery} {
      margin-right: 0;
    }
  }

  ${mobileQuery} {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
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

type Plans = {
  id: string;
  name: string;
  price: number;
  desc: string;
  features: string[];
}

type Props = {
  plans: Plans[];
  onChange: (name: string) => void;
  checkIsCurrentPlan: (id: string) => boolean;
  planChanged?: Plans;
  isYearly: boolean;
}

const Plans: React.FC<Props> = ({
  plans,
  onChange,
  planChanged,
  isYearly,
  checkIsCurrentPlan,
}) => (
  <Wrapper>
    {plans.map((plan) => (
      <PlanWrapper
        onClick={() => onChange(plan.id)}
        active={planChanged ? plan.id === planChanged.id : false}
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
              <FeatureIcon><CheckCircleIcon /></FeatureIcon>
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

export default Plans;
