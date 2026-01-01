// chart
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

// data-fns
import { format } from "date-fns";

// local
import styles from "./charts.module.css";

function LineChartComponent({ tasks = [] }) {

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(2025, i, 1), "MMM"),
        value: 0
    }));

    tasks.forEach(task => {
        const date = new Date(task.createdAt);
        const monthIndex = date.getMonth();
        monthlyData[monthIndex].value += 1;
    });

    if (!tasks.length) return null;

    return (
        <div className={styles.chartContainer}>
            <div className={styles.title}>
                <div>
                <h3>Tasks Timeline</h3>
                </div>
            </div>

            <div className={styles.chart} >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip cursor={{
                            fill: "var(--primary-300)"
                        }} />
                        <Line type="monotone" dataKey="value" stroke="#64748b" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default LineChartComponent;
