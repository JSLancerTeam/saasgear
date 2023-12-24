import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from './DashboardCard';
import ExportButton from './ExportButton';
import DropdownSelector from './DropdownSelector';
import CustomChart from './CustomChart';
import './Dashboard.css';

interface ChartData {
  date: string;
  engagement: number;
  impressions: number;
}

interface CardData {
  id: number;
  heading: string;
  count: number;
  countType: string;
  baseCount: number;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);
  const [granularity, setGranularity] = useState<string>('Day');
  useEffect(() => {
    // Simulate fetching chart data
    const chartTimeoutId = setTimeout(() => {
      const fetchedChartData: ChartData[] = [
        { date: '2020-01-01', engagement: 200, impressions: 1500 },
        { date: '2021-01-02', engagement: 240, impressions: 1200 },
        { date: '2021-01-06', engagement: 200, impressions: 2000 },
        { date: '2020-01-01', engagement: 200, impressions: 1500 },
      ];
      setChartData(fetchedChartData);
    }, 2000);
    const cardTimeoutId = setTimeout(() => {
      const fetchedCardData: CardData[] = [
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        {
          id: 1,
          heading: 'Impressions',
          baseCount: 1500,
          count: 1500,
          countType: 'times',
        },
        // ... more card data
      ];
      // Simulate fetching card data
      setCards(
        fetchedCardData.map((card) => ({
          ...card,
          count: card.baseCount, // Initialize count with baseCount
        })),
      );
    }, 2000);

    return () => {
      clearTimeout(chartTimeoutId);
      clearTimeout(cardTimeoutId);
    };
  }, []);

  useEffect(() => {
    setCards((currentCards) =>
      currentCards.map((card) => ({
        ...card,
        count: adjustCountByGranularity(card.baseCount),
      })),
    );
  }, [granularity]);

  const adjustCountByGranularity = (baseCount: number): number => {
    switch (granularity) {
      case 'Week':
        return baseCount * 7;
      case 'Month':
        return baseCount * 30;
      default:
        return baseCount;
    }
  };

  return (
    <div className="container">
      {/* Dropdown, Plus Button, and ExportButton */}
      <div className="ml-4 flex gap-4 mb-4">
        <button
          type="button"
          className="button-class mt-5"
          onClick={() => console.log('Button clicked')}
          aria-label="Add"
        >
          {/* SVG for plus button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <ExportButton />
        {/* <DropdownSelector granularity={granularity} setGranularity={setGranularity} /> */}
        <DropdownSelector
          granularity={granularity}
          onGranularityChange={setGranularity}
        />
      </div>

      {/* Cards Section */}

      <div className="pl-10 cards-row">
        {/* Render first row of DashboardCards */}
        {/* <div className="cards-row flex"> */}
        {cards.slice(0, 4).map((card) => (
          <DashboardCard
            key={card.id}
            heading={card.heading}
            count={card.count}
            countType={card.countType}
          />
        ))}
        {/* </div> */}
        {/* Render second row of DashboardCards */}
        {/* <div className="cards-row flex"> */}
        {cards.slice(4, 9).map((card) => (
          <DashboardCard
            key={card.id}
            heading={card.heading}
            count={card.count}
            countType={card.countType}
          />
        ))}
        {/* </div> */}
      </div>

      <div>
        <CustomChart data={chartData} />
      </div>
    </div>
  );
};
export default Dashboard;
