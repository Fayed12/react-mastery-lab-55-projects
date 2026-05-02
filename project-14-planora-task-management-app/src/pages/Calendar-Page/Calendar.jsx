// local
import styles from './Calendar.module.css';
import { getTasksData } from '../../Redux/tasksSlice';
import { getProjectsData } from '../../Redux/projectsSlice';

// react
import React, { useState, useMemo } from 'react';

// redux
import { useSelector } from 'react-redux';

// date-fns
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
} from 'date-fns';

// mui
import { Box, Typography, Paper, Modal, IconButton, Button, Chip } from '@mui/material';

// react icons
import { MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';

const Calendar = () => {
    const tasks = useSelector(getTasksData || []);
    const projects = useSelector(getProjectsData || []);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Combine and group tasks & projects by date
    const groupedData = useMemo(() => {
        const group = {};

        const processItem = (item, type) => {
            if (!item.dueDate) return;
            // Get date part only (yyyy-MM-dd)
            let dateKey;
            try {
                // Handle different date formats safely
                const parsedDate = new Date(item.dueDate);
                dateKey = format(parsedDate, 'yyyy-MM-dd');
            } catch (e) {
                console.log(e); // invalid date
                return;
            }

            if (!group[dateKey]) {
                group[dateKey] = [];
            }
            group[dateKey].push({ ...item, itemType: type });
        };

        tasks.forEach(task => processItem(task, 'Task'));
        projects.forEach(project => processItem(project, 'Project'));

        return group;
    }, [tasks, projects]);

    // Handle month navigation
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const jumpToToday = () => setCurrentDate(new Date());

    // Generate days for the current view
    const daysToRender = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const days = [];
        let day = startDate;

        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    }, [currentDate]);

    // Get color for priority
    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'var(--error-500)';
            case 'medium': return 'var(--warning-500)';
            case 'low': return 'var(--success-500)';
            default: return 'var(--primary-500)';
        }
    };

    // Open modal with day details
    const handleDayClick = (day) => {
        setSelectedDate(day);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    return (
        <div className={styles.calendarContainer}>
            {/* Header */}
            <div className={styles.header}>
                <Typography variant="h4" className={styles.monthTitle}>
                    {format(currentDate, 'MMMM yyyy')}
                </Typography>
                <div className={styles.headerActions}>
                    <Button
                        variant="outlined"
                        onClick={jumpToToday}
                        className={styles.todayBtn}
                    >
                        Today
                    </Button>
                    <IconButton onClick={prevMonth} className={styles.navBtn}>
                        <MdChevronLeft />
                    </IconButton>
                    <IconButton onClick={nextMonth} className={styles.navBtn}>
                        <MdChevronRight />
                    </IconButton>
                </div>
            </div>

            {/* Days of Week Row */}
            <div className={styles.daysRow}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={styles.dayName}>
                        <Typography variant="subtitle2">{day}</Typography>
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className={styles.grid}>
                {daysToRender.map((day, idx) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayItems = groupedData[dateKey] || [];
                    const isToday = isSameDay(day, new Date());
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                        <Paper
                            key={idx}
                            elevation={0}
                            className={`${styles.dayCell} ${!isCurrentMonth ? styles.outsideMonth : ''} ${isToday ? styles.today : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            <Typography className={`${styles.dayNumber} ${isToday ? styles.todayText : ''}`}>
                                {format(day, 'd')}
                            </Typography>

                            <div className={styles.itemsContainer}>
                                {dayItems.slice(0, 2).map((item, i) => (
                                    <div
                                        key={item.id || i}
                                        className={`${styles.itemPreview} ${item.isCompleted ? styles.completedItem : ''}`}
                                        style={{ borderLeftColor: getPriorityColor(item.priority) }}
                                        title={`${item.title} (${item.itemType})`}
                                    >
                                        <Typography noWrap className={styles.itemTitle}>
                                            {item.title}
                                        </Typography>
                                    </div>
                                ))}
                                {dayItems.length > 2 && (
                                    <Typography className={styles.moreLabel}>
                                        +{dayItems.length - 2} more
                                    </Typography>
                                )}
                            </div>
                        </Paper>
                    );
                })}
            </div>

            {/* Modal for Day Details */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="day-details-modal"
            >
                <Box className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <Typography variant="h6">
                            {selectedDate ? format(selectedDate, 'EEEE, MMMM do, yyyy') : ''}
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <MdClose />
                        </IconButton>
                    </div>

                    <div className={styles.modalBody}>
                        {selectedDate && (groupedData[format(selectedDate, 'yyyy-MM-dd')]?.length > 0 ? (
                            groupedData[format(selectedDate, 'yyyy-MM-dd')].map((item, idx) => (
                                <Paper
                                    key={item.id || idx}
                                    elevation={1}
                                    className={`${styles.modalItem} ${item.isCompleted ? styles.completedItem : ''}`}
                                    style={{ borderLeftColor: getPriorityColor(item.priority) }}
                                >
                                    <div className={styles.modalItemHeader}>
                                        <Typography variant="subtitle1" className={styles.modalItemTitle}>
                                            {item.title}
                                        </Typography>
                                        <Chip
                                            label={item.itemType}
                                            size="small"
                                            className={styles.itemTypeChip}
                                        />
                                    </div>
                                    <div className={styles.modalItemMeta}>
                                        <span className={styles.priorityLabel} style={{ color: getPriorityColor(item.priority) }}>
                                            • {item.priority || 'Normal'} Priority
                                        </span>
                                        {item.isCompleted && (
                                            <span className={styles.statusLabel}>✓ Completed</span>
                                        )}
                                    </div>
                                </Paper>
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <Typography color="textSecondary">
                                    No tasks or projects due on this day.
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Calendar;
