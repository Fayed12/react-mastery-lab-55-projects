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

const ProjectBarChart = ({ projects = [], isAnimationActive = true }) => {
    const highPriority = projects.filter(p => p.priority === "high").length;
    const mediumPriority = projects.filter(p => p.priority === "medium").length;
    const lowPriority = projects.filter(p => p.priority === "low").length;

    const data = [
        { name: "High", value: highPriority },
        { name: "Medium", value: mediumPriority },
        { name: "Low", value: lowPriority },
    ];

    if (!projects.length) return null;

    return (
        <div>
            <div className={styles.title}>
                <div>
                    <h3>Projects by Priority</h3>
                </div>
            </div>

            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip cursor={{
                            fill: "var(--primary-300)"
                        }} />
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

export default ProjectBarChart;
