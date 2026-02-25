import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { AssessmentResult } from "@/data/assessmentData";

interface MaturityRadarChartProps {
  result: AssessmentResult;
}

const MaturityRadarChart = ({ result }: MaturityRadarChartProps) => {
  const data = result.dims.map((d) => ({
    dimension: d.label.length > 20 ? d.label.slice(0, 18) + "…" : d.label,
    fullName: d.label,
    score: Math.round(d.pct),
    fullMark: 100,
  }));

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
        Dimension Overview
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Higher values indicate stronger readiness in each governance dimension.
      </p>
      <ResponsiveContainer width="100%" height={340}>
        <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          />
          <Radar
            name="Readiness %"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: 8,
              fontSize: 13,
            }}
            formatter={(value: number, name: string) => [`${value}%`, "Score"]}
            labelFormatter={(label: string) => {
              const item = data.find((d) => d.dimension === label);
              return item?.fullName || label;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaturityRadarChart;
