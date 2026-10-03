import {
  Area,
  AreaChart,
  CartesianGrid,
  createHorizontalChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartPoint = {
  label: string;
  x: number;
  y: number;
};

const Typed = createHorizontalChart<ChartPoint, string, number>()({
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
});

const fallback: ChartPoint[] = [
  { label: "Dush", x: 0, y: 0 },
  { label: "Sesh", x: 0, y: 0 },
  { label: "Chor", x: 0, y: 0 },
  { label: "Pay", x: 0, y: 0 },
  { label: "Ju", x: 0, y: 0 },
  { label: "Sha", x: 0, y: 0 },
  { label: "Yak", x: 0, y: 0 },
];

function mapChart(data: any): ChartPoint[] {
  if (!Array.isArray(data) || data.length === 0) return fallback;

  return data.map((item) => ({
    label: item?.day ?? item?.label ?? "",
    x: Number(item?.revenue ?? item?.x ?? 0),
    y: Number(item?.value ?? item?.orders ?? item?.y ?? 0),
  }));
}

export default function AreaChartExample({
  isAnimationActive = true,
  data,
}: {
  isAnimationActive?: boolean;
  data: any;
}) {
  return (
    <Typed.AreaChart
      style={{ width: "100%", height: 188 }}
      responsive
      data={mapChart(data)}
      margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--app-primary)" stopOpacity={0.35} />
          <stop offset="95%" stopColor="var(--app-primary)" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--app-primary)" stopOpacity={0.18} />
          <stop offset="95%" stopColor="var(--app-primary)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="var(--app-line)" strokeDasharray="3 6" />
      <Typed.XAxis dataKey="label" tick={{ fill: "var(--app-muted)", fontSize: 11 }} />
      <Typed.YAxis width="auto" tick={{ fill: "var(--app-muted)", fontSize: 11 }} />
      <Tooltip
        contentStyle={{
          background: "var(--app-surface)",
          border: "1px solid var(--app-line)",
          borderRadius: 12,
          color: "var(--app-ink)",
        }}
      />
      <Typed.Area
        type="monotone"
        dataKey="x"
        stroke="var(--app-primary)"
        activeDot={{ stroke: "var(--app-primary)" }}
        fillOpacity={1}
        fill="url(#colorUv)"
        isAnimationActive={isAnimationActive}
        animationBegin={120}
        animationDuration={1100}
      />
      <Typed.Area
        type="monotone"
        dataKey="y"
        stroke="var(--app-ink)"
        activeDot={{ stroke: "var(--app-ink)" }}
        fillOpacity={1}
        fill="url(#colorPv)"
        isAnimationActive={isAnimationActive}
        animationDuration={1100}
      />
    </Typed.AreaChart>
  );
}
