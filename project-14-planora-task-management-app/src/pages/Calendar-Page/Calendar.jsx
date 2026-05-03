// local
import styles from './Calendar.module.css';
import { getTasksData } from '../../Redux/tasksSlice';
import { getProjectsData } from '../../Redux/projectsSlice';
import MainButton from "../../ui/button/MainButton"

// react
import { useState, useMemo } from 'react';

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
import { Box, Typography, Paper, Modal, Chip } from '@mui/material';

// react icons
import { 
    MdChevronLeft, 
    MdChevronRight, 
    MdClose, 
    MdCheckCircle, 
    MdFlag, 
    MdOutlineRadioButtonUnchecked, 
    MdLockOutline, 
    MdPublic, 
    MdCategory, 
    MdTask
} from 'react-icons/md';

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

                if (isNaN(parsedDate)) return;

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
    console.log("selected date: ", groupedData)


    // Handle month navigation and today button
    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const jumpToToday = () => setCurrentDate(new Date());

    // Generate all days between startDate and endDate (inclusive)
    // We start from startDate and keep adding 1 day until we reach endDate
    // This ensures we cover full weeks for the calendar grid (including previous/next month days)
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

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.headerSection}>
                {/* Header */}
                <div className={styles.header}>
                    <Typography variant="h4" className={styles.monthTitle}>
                        {format(currentDate, 'MMMM yyyy')}
                    </Typography>
                    <div className={styles.headerActions}>
                        <MainButton type='button' title='Today' clickEvent={jumpToToday} content={"Today"} />
                        <MainButton type='button' title='prev' clickEvent={prevMonth} content={<MdChevronLeft />} />
                        <MainButton type='button' title='next' clickEvent={nextMonth} content={<MdChevronRight />} />
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
            </div>

            {/* Calendar Grid */}
            <div className={styles.grid}>
                {daysToRender?.map((day, idx) => {
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
                                {dayItems?.slice(0, 2).map((item, i) => (
                                    <div
                                        key={item?.id || i}
                                        className={`${styles.itemPreview} ${item?.isCompleted ? styles.completedItem : ''}`}
                                        style={{ borderLeftColor: getPriorityColor(item?.priority) }}
                                        title={`${item?.title} (${item?.itemType})`}
                                    >
                                        <div className={styles.itemPreviewHeader}>
                                            <span className={styles.itemPreviewType}>{item?.itemType}</span>
                                            <div className={styles.itemPreviewIcons}>
                                                {item?.isCompleted ? 
                                                    <MdCheckCircle className={styles.completedIcon} /> : 
                                                    <MdOutlineRadioButtonUnchecked className={styles.pendingIcon} />
                                                }
                                                <MdFlag style={{ color: getPriorityColor(item?.priority) }} className={styles.priorityIcon} />
                                            </div>
                                        </div>
                                        <Typography noWrap className={styles.itemTitle}>
                                            {item?.title}
                                        </Typography>
                                    </div>
                                ))}
                                {dayItems?.length > 2 && (
                                    <Typography className={styles.moreLabel}>
                                        +{dayItems?.length - 2} more
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
                        <MainButton type='button' title='close' clickEvent={handleCloseModal} content={<MdClose />} />
                    </div>

                    <div className={styles.modalBody}>
                        {selectedDate && (groupedData[format(selectedDate, 'yyyy-MM-dd')]?.length > 0 ? (
                            groupedData[format(selectedDate, 'yyyy-MM-dd')].map((item, idx) => (
                                <Paper
                                    key={item?.id || idx}
                                    elevation={1}
                                    className={`${styles.modalItem} ${item?.isCompleted ? styles.completedItem : ''}`}
                                    style={{ borderLeftColor: getPriorityColor(item?.priority) }}
                                >
                                    <div className={styles.modalItemHeader}>
                                        <Typography variant="subtitle1" className={styles.modalItemTitle}>
                                            {item?.title}
                                        </Typography>
                                        <Chip
                                            label={item?.itemType}
                                            size="small"
                                            className={styles.itemTypeChip}
                                        />
                                    </div>
                                    <div className={styles.modalItemContent}>
                                        <Typography variant="body2" className={styles.modalItemDetail}>
                                            <MdFlag style={{ color: getPriorityColor(item?.priority) }} />
                                            <span style={{ color: getPriorityColor(item?.priority) }}>{item?.priority || 'Normal'} Priority</span>
                                        </Typography>
                                        
                                        {item?.itemType === 'Task'?  (
                                            <Typography variant="body2" className={styles.modalItemDetail}>
                                                <MdCategory className={styles.categoryIcon} />
                                                <span>{item?.category?.name || 'No Category'}</span>
                                            </Typography>
                                        ) : 
                                            (
                                                <Typography variant="body2" className={styles.modalItemDetail}>
                                                    <MdTask className={styles.categoryIcon} />
                                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                        {item?.linkedTasks?.map((task, idx) => (
                                                            <Chip
                                                                key={idx}
                                                                label={task?.title}
                                                                size="small"
                                                                className={styles.taskChip}
                                                            />
                                                        ))}
                                                        {item?.linkedTasks?.length === 0 && <Typography style={{ fontSize: '12px', color: 'var(--text-500)' }}>No tasks linked</Typography>}
                                                    </div>
                                                </Typography>
                                        )}
                                        
                                        <Typography variant="body2" className={styles.modalItemDetail}>
                                            {item?.privacy === 'global' ? <MdPublic className={styles.privacyIcon} /> : <MdLockOutline className={styles.privacyIcon} />}
                                            <span>{item?.privacy === 'global' ? 'Public' : 'Private'}</span>
                                        </Typography>
                                        
                                        <Typography variant="body2" className={`${styles.modalItemDetail} ${item?.isCompleted ? styles.statusCompleted : styles.statusPending}`}>
                                            {item?.isCompleted ? <MdCheckCircle /> : <MdOutlineRadioButtonUnchecked />}
                                            <span>{item?.isCompleted ? 'Completed' : 'Pending'}</span>
                                        </Typography>
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
