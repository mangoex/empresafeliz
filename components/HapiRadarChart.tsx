import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { HapiScore } from '../types';

interface Props {
  data: HapiScore[];
  onPillarClick?: (pillar: string) => void;
}

const HapiRadarChart: React.FC<Props> = ({ data, onPillarClick }) => {
  // Transform data for Recharts
  const chartData = data.map(item => ({
    subject: item.pillar,
    A: item.normalizedScore,
    fullMark: 10,
    raw: item.rawScore
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 14, fontWeight: 600 }}
            cursor="pointer"
            onClick={(e) => onPillarClick && e && onPillarClick(e.value as string)}
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Índice HAPI (0-10)"
            dataKey="A"
            stroke="#0d9488"
            strokeWidth={3}
            fill="#14b8a6"
            fillOpacity={0.4}
          />
          <Tooltip 
            formatter={(value: number, name: string, props: any) => [
              `${value.toFixed(1)} / 10`, 
              `Puntaje`
            ]}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HapiRadarChart;
