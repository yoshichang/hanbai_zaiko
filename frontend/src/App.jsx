import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: '7/20', stock: 180, forecast: 15, lastYear: null },
  { date: '7/21', stock: 165, forecast: 10, lastYear: null },
  { date: '7/22', stock: 150, forecast: 10, lastYear: null },
  { date: '7/23', stock: 135, forecast: 15, lastYear: null }, // ← 本日
  { date: '7/24', stock: 120, forecast: null, lastYear: 10 },
  { date: '7/25', stock: 100, forecast: null, lastYear: 10 },
  { date: '7/26', stock: 80,  forecast: null, lastYear: 5 },
  { date: '7/27', stock: 55,  forecast: null, lastYear: 5 },
  { date: '7/28', stock: 30,  forecast: null, lastYear: 20 },
];

const TODAY = '7/23'; // 本日の日付（あとで動的に計算する）

const COLORS = {
  stock: '#94A3B8',
  forecast: '#1E293B',
  lastYear: '#CBD5E1',
  grid: '#EDE9E3',
  text: '#334155',
  pageBg: '#FAF7F2',
  cardBg: '#FFFFFF',
  today: '#1E293B',
};

// 「本日」ラベルボックスをカスタム描画
const TodayLabel = ({ viewBox, stockValue }) => {
  const { x, y } = viewBox;
  const boxWidth = 100;
  const boxHeight = 52;
  return (
    <g>
      <rect
        x={x - boxWidth / 2}
        y={y - boxHeight - 10}
        width={boxWidth}
        height={boxHeight}
        rx={8}
        fill="#fff"
        stroke={COLORS.today}
        strokeWidth={1.5}
      />
      <text x={x} y={y - boxHeight + 12} textAnchor="middle" fontSize={12} fill={COLORS.text}>
        本日
      </text>
      <text x={x} y={y - boxHeight + 32} textAnchor="middle" fontSize={15} fontWeight="bold" fill={COLORS.text}>
        {stockValue} c/s
      </text>
    </g>
  );
};

function App() {
  const todayData = data.find((d) => d.date === TODAY);
  const currentStock = todayData?.stock ?? 0;

  return (
    <div style={{ backgroundColor: COLORS.pageBg, padding: 32, fontFamily: 'sans-serif' }}>
      <div
        style={{
          backgroundColor: COLORS.cardBg,
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <h2 style={{ color: COLORS.text, margin: 0, fontSize: 20 }}>
              在庫・見込み管理アプリ（テスト表示）
            </h2>
            <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: 13 }}>
              集計期間：2025年7月20日〜7月28日
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.text, lineHeight: 1 }}>
              {currentStock} <span style={{ fontSize: 16, fontWeight: 400, color: '#94A3B8' }}>c/s</span>
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>現在庫数（{TODAY}時点）</div>
          </div>
        </div>

        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 80, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: COLORS.text, fontSize: 12 }} axisLine={{ stroke: COLORS.grid }} />

              <YAxis
                yAxisId="left"
                domain={[0, (max) => Math.ceil(max * 1.3)]}
                tick={{ fill: COLORS.text, fontSize: 12 }}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, (max) => Math.ceil(max * 1.5)]}
                tick={{ fill: COLORS.text, fontSize: 12 }}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: `1px solid ${COLORS.grid}`,
                  borderRadius: 8,
                  fontSize: 13,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 13, color: COLORS.text }} />

              {/* 本日マーカー：縦線＋ラベルボックス */}
              <ReferenceLine
                yAxisId="left"
                x={TODAY}
                stroke={COLORS.today}
                strokeWidth={1.5}
                label={<TodayLabel stockValue={currentStock} />}
              />

              <Bar
                yAxisId="left"
                dataKey="stock"
                fill={COLORS.stock}
                name="在庫数"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />

              <Line
                yAxisId="right"
                type="linear"
                dataKey="forecast"
                stroke={COLORS.forecast}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.forecast }}
                name="フォーキャスト"
                connectNulls
              />

              <Line
                yAxisId="right"
                type="linear"
                dataKey="lastYear"
                stroke={COLORS.lastYear}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS.lastYear }}
                name="前年実績"
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
