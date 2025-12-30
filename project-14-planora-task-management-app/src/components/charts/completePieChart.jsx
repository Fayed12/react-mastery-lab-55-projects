// charts
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// local
import styles from "./charts.module.css"

const COLORS = ["#22c55e", "#f59e0b"]; // Success, Warning

function PieChartComponent({ tasks = [], isAnimationActive = true }) {
    const completedCount = tasks.filter(task => task.isCompleted).length;
    const notCompletedCount = tasks.length - completedCount;

    const percentage = tasks.length
        ? Math.round((completedCount / tasks.length) * 100)
        : 0;


    const data = [
        { name: "Done", value: completedCount },
        { name: "Pending", value: notCompletedCount },
    ];

    if (tasks.length === 0) return null;

    return (
        <div>
            <div className={styles.title}>
                <h3>Task Progress</h3>
                <p>
                    Total Tasks: {tasks.length}
                </p>
            </div>

            <div className={styles.chart}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={120}
                            label
                            isAnimationActive={isAnimationActive}
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>

                        <Tooltip />
                        {window.innerWidth > 480 && <Legend />}
                        <RechartsDevtools />

                        <text
                            x="50%"
                            y="46%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "bold" }}
                        >
                            {percentage}%
                        </text>

                        <text
                            x="50%"
                            y="53%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: "clamp(12px, 3vw, 14px)", fill: "#777" }}
                        >
                            Completed
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PieChartComponent;
