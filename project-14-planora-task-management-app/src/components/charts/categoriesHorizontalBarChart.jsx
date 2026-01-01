// local
import styles from "./charts.module.css"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


const HorizontalBarChart = ({ categories = [] }) => {
    if (!categories.length) return null;

    const data = categories.map(category => ({
        name: category?.title,
        value: category?.relatedTasks.length
    }));

    return (
        <div>
            <div className={styles.title}>
                <div>
                    <h3>Categories</h3>
                </div>
            </div>

            <div className={styles.chart}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis type="number" allowDecimals={false} />

                        <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                        />

                        <Tooltip cursor={{
                            fill: "var(--primary-300)"
                        }} />

                        <Bar
                            dataKey="value"
                            fill="#64748b"
                            radius={[0, 6, 6, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HorizontalBarChart;
