import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardCard from './DashboardCard';
import ExportButton from './ExportButton';
import DropdownSelector from './DropdownSelector';
import CustomChart from './CustomChart';

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
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [cards, setCards] = useState<CardData[]>([]);

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

    // Simulate fetching card data
    const cardTimeoutId = setTimeout(() => {
      const fetchedCardData: CardData[] = [
        { id: 1, heading: 'Impressions', count: 1500, countType: 'times' },
        { id: 2, heading: 'Widget opened', count: 300, countType: 'times' },
        { id: 3, heading: 'Tools opened', count: 400, countType: 'times' },
        { id: 4, heading: 'Pop-ups Clicked', count: 500, countType: 'clicks' },
        { id: 5, heading: 'Total Events', count: 600, countType: 'events' },
        { id: 6, heading: 'Widget closed', count: 700, countType: 'events' },
        { id: 7, heading: 'Tool closed', count: 800, countType: 'events' },
        { id: 8, heading: 'Pop-ups closed', count: 900, countType: 'events' },
        // ... more card data if needed
      ];
      setCards(fetchedCardData);
    }, 2000);

    // Clean up the timeouts when the component unmounts
    return () => {
      clearTimeout(chartTimeoutId);
      clearTimeout(cardTimeoutId);
    };
  }, []);

  return (
    <>
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
        <DropdownSelector />
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="pl-10">
          {/* Render first row of DashboardCards */}
          <div className="cards-row flex">
            {cards.slice(0, 4).map(card => (
              <DashboardCard
                key={card.id}
                heading={card.heading}
                count={card.count}
                countType={card.countType}
              />
            ))}
          </div>
          {/* Render second row of DashboardCards */}
          <div className="cards-row flex">
            {cards.slice(4, 9).map(card => (
              <DashboardCard
                key={card.id}
                heading={card.heading}
                count={card.count}
                countType={card.countType}
              />
            ))}
          </div>
        </div>
        <CustomChart data={chartData} />
      </div>
    </>
  );
};
export default Dashboard;
