import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";



export const MyRoundedDiagram = ({realTimeUsers}:{realTimeUsers:any}) => {
 
  return (
    <div className="h-[72px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
        data={
          !realTimeUsers?[]:
          realTimeUsers?.perMinute?.map((item: { users?: number }) => {
            return {val:item?.users}
          })
        }
         barGap={2} 
         barCategoryGap="20%">
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "var(--app-surface)",
              borderRadius: "8px",
              color: "var(--app-ink)",
              border: "1px solid var(--app-line)",
              padding: "4px 8px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="val" fill="var(--app-primary)" radius={[2, 2, 2, 2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
