import { Area, AreaChart, CartesianGrid, createHorizontalChart, Tooltip, XAxis, YAxis } from "recharts";

type MockDataType = {
  label: string;
  x: number;
  y: number;
};

const data: MockDataType[] = [
  { label: "Dush", x: 30, y: 25 },
  { label: "Sesh", x: 25, y: 25 },
  { label: "Chor", x: 40, y: 25 },
  { label: "Pay", x: 80, y: 35 },
  { label: "Ju", x: 30, y: 25 },
  { label: "Sha", x: 40, y: 45 },
  { label: "Yak", x: 30, y: 25 },
];

const Typed = createHorizontalChart<MockDataType, string, number>()({
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
});

const CustomersDiagramma = ({ isAnimationActive = true }) => (
  <Typed.AreaChart
    style={{ width: "100%", maxHeight: "40vh", aspectRatio: 1.618 }}
    responsive
    data={data}
    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="customersUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--app-primary)" stopOpacity={0.35} />
        <stop offset="95%" stopColor="var(--app-primary)" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="customersPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--app-primary)" stopOpacity={0.18} />
        <stop offset="95%" stopColor="var(--app-primary)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid stroke="var(--app-line)" strokeDasharray="3 6" />
    <Typed.XAxis dataKey="label" tick={{ fill: "var(--app-muted)", fontSize: 12 }} />
    <Typed.YAxis width="auto" tick={{ fill: "var(--app-muted)", fontSize: 12 }} />
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
      fillOpacity={1}
      fill="url(#customersUv)"
      isAnimationActive={isAnimationActive}
    />
    <Typed.Area
      type="monotone"
      dataKey="y"
      stroke="var(--app-ink)"
      fillOpacity={1}
      fill="url(#customersPv)"
      isAnimationActive={isAnimationActive}
    />
  </Typed.AreaChart>
);

export default CustomersDiagramma;
