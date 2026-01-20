import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BusinessKpi } from '../types';

interface Props {
  data: BusinessKpi[];
}

const RoiChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" scale="point" padding={{ left: 10, right: 10 }} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
          
          {/* Left Axis for Percentages (Turnover & Absenteeism) */}
          <YAxis yAxisId="left" orientation="left" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} label={{ value: 'Tasa %', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
          
          {/* Right Axis for HAPI Index (0-10) */}
          <YAxis yAxisId="right" orientation="right" domain={[0, 10]} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} label={{ value: 'Índice HAPI', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
          
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />

          <Bar yAxisId="left" dataKey="turnoverRate" name="Rotación (%)" barSize={12} fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="absenteeismRate" name="Absentismo (%)" barSize={12} fill="#fbbf24" radius={[4, 4, 0, 0]} />
          
          <Line yAxisId="right" type="monotone" dataKey="happinessIndex" name="Felicidad Org. (HAPI)" stroke="#0d9488" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{ r: 8 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoiChart;