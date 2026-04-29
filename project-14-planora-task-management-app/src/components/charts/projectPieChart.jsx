// charts
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// local
import styles from "./charts.module.css"

const COLORS = ["var(--primary-400)", "var(--primary-700)"]; // Success, Warning

function ProjectPieChart({ projects = [], isAnimationActive = true }) {
    const completedCount = projects.filter(project => project.isCompleted).length;
    const notCompletedCount = projects.length - completedCount;

    const percentage = projects.length
        ? Math.round((completedCount / projects.length) * 100)
        : 0;

    const data = [
        { name: "Done", value: completedCount },
        { name: "Active", value: notCompletedCount },
    ];

    if (projects.length === 0) return null;

    return (
        <div>
            <div className={styles.title}>
                <div>
                    <h3>Project Status</h3>
                    <p>
                        Total Projects: {projects.length}
                    </p>
                </div>
            </div>

            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={350} aspect={1}>
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

                        <Tooltip cursor={{
                            fill: "var(--primary-300)"
                        }} />
                        {window.innerWidth > 480 && <Legend />}
                        <RechartsDevtools />

                        <text
                            x="50%"
                            y="46%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "bold", fill:"var(--text-500)" }}
                        >
                            {percentage}%
                        </text>

                        <text
                            x="50%"
                            y="53%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: "clamp(12px, 3vw, 14px)", fill: "var(--text-400)" }}
                        >
                            Completed
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ProjectPieChart;
