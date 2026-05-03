import { format } from 'date-fns';

export const getTaskStats = (tasks = []) => {

    let completed = 0;
    let pending = 0;

    let priorityCount = { low: 0, medium: 0, high: 0 };
    const tasksByDate = {};

    tasks.forEach(task => {
        const isCompleted = task.isCompleted === true || task.isCompleted === 'true';
        
        if (isCompleted) {
            completed++;
        } else {
            pending++;
        }

        const priority = task.priority?.toLowerCase() || 'low';
        if (priorityCount[priority] !== undefined) {
            priorityCount[priority]++;
        } else {
            priorityCount['low']++;
        }

        if (task.createdAt) {
            const dateStr = format(new Date(task.createdAt), 'MMM dd');
            if (!tasksByDate[dateStr]) tasksByDate[dateStr] = 0;
            tasksByDate[dateStr]++;
        }
    });

    const total = tasks.length;
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

    const trendData = Object.keys(tasksByDate).map(date => ({
        date,
        count: tasksByDate[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
        total,
        completed,
        pending,
        completionRate: parseFloat(completionRate),
        priorityCount: [
            { name: 'Low', value: priorityCount.low, color: '#3b82f6' },
            { name: 'Medium', value: priorityCount.medium, color: '#f59e0b' },
            { name: 'High', value: priorityCount.high, color: '#ef4444' }
        ],
        trendData
    };
};

export const getProjectStats = (projects = []) => {
    let completed = 0;
    let active = 0;
    let totalProgress = 0;

    const progressBuckets = {
        '0-25%': 0,
        '26-50%': 0,
        '51-75%': 0,
        '76-100%': 0
    };

    projects.forEach(project => {
        const isCompleted = project.isCompleted === true || project.isCompleted === 'true';
        if (isCompleted) {
            completed++;
        } else {
            active++;
        }

        const progress = Number(project.progress || 0);
        totalProgress += progress;

        if (progress <= 25) progressBuckets['0-25%']++;
        else if (progress <= 50) progressBuckets['26-50%']++;
        else if (progress <= 75) progressBuckets['51-75%']++;
        else progressBuckets['76-100%']++;
    });

    const total = projects.length;
    const averageProgress = total > 0 ? (totalProgress / total).toFixed(1) : 0;

    const progressData = Object.keys(progressBuckets).map(bucket => ({
        name: bucket,
        projects: progressBuckets[bucket]
    }));

    return {
        total,
        completed,
        active,
        averageProgress: parseFloat(averageProgress),
        progressData
    };
};

export const getCategoryStats = (categories = [], tasks = []) => {
    let totalStars = 0;
    
    // Map category id to name
    const categoryMap = {};
    categories.forEach(cat => {
        categoryMap[cat.id] = cat.title || 'Unknown';
        totalStars += Number(cat.stars || 0);
    });

    const categoryTasksCount = {};
    
    tasks.forEach(task => {
        if (task.category) {
            const catId = task.category.id;

            categoryTasksCount[catId] = (categoryTasksCount[catId] || 0) + 1;
        }

        if (Array.isArray(task.categories)) {
            task.categories.forEach(cat => {
                const catId = typeof cat === "object" ? cat.id : cat;
                categoryTasksCount[catId] = (categoryTasksCount[catId] || 0) + 1;
            });
        }
    });

    let mostUsedCategory = { title: 'None', count: 0 };
    const chartData = [];

    categories.forEach(cat => {
        const count = categoryTasksCount[cat.id] || 0;
        chartData.push({
            name: cat.title,
            tasks: count
        });

        if (count > mostUsedCategory.count) {
            mostUsedCategory = { title: cat.title, count };
        }
    });

    const total = categories.length;
    const averageStars = total > 0 ? (totalStars / total).toFixed(1) : 0;

    return {
        total,
        mostUsedCategory,
        averageStars: parseFloat(averageStars),
        chartData
    };
};

export const getProductivityStats = (tasks = []) => {
    const dayOfWeekCount = {};
    const labelCount = {};
    
    tasks.forEach(task => {
        // Most productive day
        if (task.createdAt) {
            const day = format(new Date(task.createdAt), 'EEEE'); // e.g. 'Monday'
            if (!dayOfWeekCount[day]) dayOfWeekCount[day] = 0;
            dayOfWeekCount[day]++;
        }

        // Labels
        if (task.labels && Array.isArray(task.labels)) {
            task.labels.forEach(label => {
                const labelName = typeof label === 'object' ? label.name || label.title : label;
                if (labelName) {
                    if (!labelCount[labelName]) labelCount[labelName] = 0;
                    labelCount[labelName]++;
                }
            });
        }
    });

    let mostProductiveDay = 'N/A';
    let maxDayCount = 0;
    Object.entries(dayOfWeekCount).forEach(([day, count]) => {
        if (count > maxDayCount) {
            maxDayCount = count;
            mostProductiveDay = day;
        }
    });

    let mostUsedLabel = 'N/A';
    let maxLabelCount = 0;
    Object.entries(labelCount).forEach(([label, count]) => {
        if (count > maxLabelCount) {
            maxLabelCount = count;
            mostUsedLabel = label;
        }
    });

    return {
        mostProductiveDay,
        mostUsedLabel,
    };
};
