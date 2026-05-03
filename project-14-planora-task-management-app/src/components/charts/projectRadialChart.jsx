// charts
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend, Tooltip, ResponsiveContainer } from "recharts";

// local
import styles from "./charts.module.css"

function ProjectRadialChart({ projects = [], isAnimationActive = true }) {
    
    // Calculate average progress of all projects
    const totalProgress = projects.reduce((acc, project) => acc + Number(project.progress || 0), 0);
    const averageProgress = projects.length ? Number((totalProgress / projects.length).toFixed(1)) : 0;

    const data = [
        {
            name: "Average Progress",
            uv: averageProgress,
            fill: "var(--primary-500)",
        }
    ];

    if (!projects.length) return null;

    return (
        <div>
            <div className={styles.title}>
                <div>
                    <h3>Average Progress</h3>
                </div>
            </div>

            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={350}>
                    <RadialBarChart 
                        cx="50%" 
                        cy="50%" 
                        innerRadius="60%" 
                        outerRadius="100%" 
                        barSize={30} 
                        data={data}
                        startAngle={180}
                        endAngle={-180}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar
                            minAngle={15}
                            background={{ fill: 'var(--bg-100)' }}
                            clockWise
                            dataKey="uv"
                            cornerRadius={10}
                            isAnimationActive={isAnimationActive}
                        />
                        <Tooltip />
                        
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: "bold", fill: "var(--text-500)" }}
                        >
                            {averageProgress}%
                        </text>
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ProjectRadialChart;
