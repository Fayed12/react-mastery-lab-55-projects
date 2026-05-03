// local
import styles from './Statistics.module.css';
import { getCategoriesData } from '../../Redux/categoriesSlice';
import { getProjectsData } from '../../Redux/projectsSlice';
import { getTasksData } from '../../Redux/tasksSlice';
import { getUserDetails } from '../../Redux/authUserSlice';
import {
    getTaskStats,
    getProjectStats,
    getCategoryStats,
    getProductivityStats
} from '../../services/statistics/statisticsService';

// react
import { useMemo } from 'react';

// redux
import { useSelector } from 'react-redux';

// mui
import { Avatar, Box, Typography } from '@mui/material';

// recharts
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';

// icons
import {
    FaTasks, FaProjectDiagram, FaTags, FaCheckCircle,
    FaExclamationCircle, FaChartLine, FaCalendarDay
} from 'react-icons/fa';

const Statistics = () => {
    const tasks = useSelector(getTasksData || []);
    const categories = useSelector(getCategoriesData || []);
    const projects = useSelector(getProjectsData || []);
    const user = useSelector(getUserDetails);

    // Compute stats using service layer
    const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);
    const projectStats = useMemo(() => getProjectStats(projects), [projects]);
    const categoryStats = useMemo(() => getCategoryStats(categories, tasks), [categories, tasks]);
    const productivityStats = useMemo(() => getProductivityStats(tasks), [tasks]);

    const taskPieData = [
        { name: 'Completed', value: taskStats.completed },
        { name: 'Pending', value: taskStats.pending }
    ];

    const projectPieData = [
        { name: 'Completed', value: projectStats.completed },
        { name: 'Active', value: projectStats.active }
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Statistics</h1>
                {user && (
                    <div className={styles.userInfo}>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography className={styles.userName}>{user.name}</Typography>
                            <Typography className={styles.userEmail}>{user.email}</Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: 'var(--primary-600)', color: 'white' }}>
                            {user.name?.charAt(0).toUpperCase()}
                            {user.name?.split(" ")?.at(1)?.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                )}
            </div>

            {/* Global Overview */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Global Overview</h2>
                <div className={styles.gridKpi}>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaTasks /> Total Tasks</span>
                        <span className={styles.cardValue}>{taskStats.total}</span>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaCheckCircle color="var(--success-500)" /> Completion Rate</span>
                        <span className={styles.cardValue}>{taskStats.completionRate}%</span>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaExclamationCircle color="var(--error-500)" /> Pending Tasks</span>
                        <span className={styles.cardValue}>{taskStats.pending}</span>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaProjectDiagram /> Active Projects</span>
                        <span className={styles.cardValue}>{projectStats.active}</span>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaTags /> Total Categories</span>
                        <span className={styles.cardValue}>{categoryStats.total}</span>
                    </div>
                </div>
            </section>

            {/* Task Analytics */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Task Analytics</h2>
                <div className={styles.gridCharts}>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Task Status</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={taskPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                                        <Cell fill="var(--success-500)" />
                                        <Cell fill="var(--warning-500)" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Tasks by Priority</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={taskStats.priorityCount}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-100)" />
                                    <XAxis dataKey="name" stroke="var(--text-500)" />
                                    <YAxis stroke="var(--text-500)" />
                                    <Tooltip cursor={{ fill: 'var(--bg-200)' }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {taskStats.priorityCount.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Task Creation Trends</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={taskStats.trendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-100)" />
                                    <XAxis dataKey="date" stroke="var(--text-500)" />
                                    <YAxis stroke="var(--text-500)" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="count" stroke="var(--primary-600)" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Analytics */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Project Analytics</h2>
                <div className={styles.gridCharts}>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Project Status</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={projectPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        <Cell fill="var(--success-500)" />
                                        <Cell fill="var(--info-500)" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Project Progress Distribution</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={projectStats.progressData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-100)" />
                                    <XAxis dataKey="name" stroke="var(--text-500)" />
                                    <YAxis stroke="var(--text-500)" />
                                    <Tooltip cursor={{ fill: 'var(--bg-200)' }} />
                                    <Bar dataKey="projects" fill="var(--primary-500)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle}>Average Progress</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius="60%" 
                                    outerRadius="100%" 
                                    barSize={30} 
                                    data={[{
                                        name: "Average Progress",
                                        uv: projectStats.averageProgress || 0,
                                        fill: "var(--primary-500)"
                                    }]}
                                    startAngle={180}
                                    endAngle={-180}
                                >
                                    {/* 50% */}
                                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                    <RadialBar
                                        minAngle={15}
                                        background={{ fill: 'var(--bg-100)' }}
                                        clockWise
                                        dataKey="uv"
                                        cornerRadius={10}
                                    />
                                    <Tooltip />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: "bold", fill: "var(--text-500)" }}
                                    >
                                        {projectStats.averageProgress || 0}%
                                    </text>
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Analytics */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Category Analytics</h2>
                <div className={styles.gridCharts}>
                    <div className={styles.chartCard} style={{ gridColumn: '1 / -1' }}>
                        <h3 className={styles.chartTitle}>Tasks per Category</h3>
                        <div className={styles.chartWrapper}>
                            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                                <BarChart data={categoryStats?.chartData || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-100)" />
                                    <XAxis dataKey="name" stroke="var(--text-500)" />
                                    <YAxis stroke="var(--text-500)" />
                                    <Tooltip cursor={{ fill: 'var(--bg-200)' }} />
                                    <Bar dataKey="tasks" fill="var(--info-500)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className={styles.gridKpi} style={{ marginTop: 'var(--space-lg)' }}>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}>Top Category</span>
                        <span className={styles.cardValue}>{categoryStats.mostUsedCategory.title}</span>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}>Avg Category Stars</span>
                        <span className={styles.cardValue}>{categoryStats.averageStars} / 5</span>
                    </div>
                </div>
            </section>

            {/* Productivity Insights */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Productivity Insights</h2>
                <div className={styles.gridKpi}>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaCalendarDay color="var(--primary-500)" /> Most Productive Day</span>
                        <span className={styles.cardValue}>{productivityStats.mostProductiveDay}</span>
                    </div>
                    <div className={styles.card}>
                        <span className={styles.cardTitle}><FaChartLine color="var(--primary-500)" /> Top Label</span>
                        <span className={styles.cardValue}>{productivityStats.mostUsedLabel}</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Statistics;