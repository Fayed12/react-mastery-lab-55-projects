// charts
import {
    BarChart,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    ResponsiveContainer,
    Cell
} from "recharts";

// local
import styles from "./charts.module.css"

const BarChartComponent = ({ tasks = [], isAnimationActive = true }) => {
    const highPriority = tasks.filter(t => t.priority === "high").length;
    const mediumPriority = tasks.filter(t => t.priority === "medium").length;
    const lowPriority = tasks.filter(t => t.priority === "low").length;

    const data = [
        { name: "High", value: highPriority },
        { name: "Medium", value: mediumPriority },
        { name: "Low", value: lowPriority },
    ];

    if (!tasks.length) return null;

    return (
        <div>
            <div className={styles.title}>
                <h3>Priority</h3>
            </div>

            <div className={styles.barCharts} style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />

                        <Bar
                            dataKey="value"
                            isAnimationActive={isAnimationActive}
                            radius={[6, 6, 0, 0]}
                        >
                            {
                                data.map((entry, index) => {
                                    let color = '#64748b'; // default
                                    if (entry.name === 'High') color = '#ef4444'; // error
                                    if (entry.name === 'Medium') color = '#f59e0b'; // warning
                                    if (entry.name === 'Low') color = '#22c55e'; // success
                                    return <Cell key={`cell-${index}`} fill={color} />;
                                })
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartComponent;
