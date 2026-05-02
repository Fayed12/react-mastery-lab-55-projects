// local
import styles from "./createEditNewItem.module.css"
import MainInput from "../../ui/input/MainInput"
import MainButton from "../../ui/button/MainButton"
import UserSelect from "../select-meu/selectMenu";
import { customStyles } from "../select-meu/selectStyles";
import { getAllUsersData, getUserDetails } from "../../Redux/authUserSlice";
import { getCategoriesData } from "../../Redux/categoriesSlice";
import { getTasksData } from "../../Redux/tasksSlice";
import { getProjectsData } from "../../Redux/projectsSlice";
import DateTimePicker from "../Date-Time-Picker/DateTimePicker";
import createDocument from "../../firebase/addNewData";
import updateData from "../../firebase/updateExistingData";
import useUserRole from "../../hooks/userUserRole";

// react hook form
import { useForm, Controller } from "react-hook-form";

// react select
import Select from "react-select"
import CreatableSelect from "react-select/creatable";

// redux
import { useSelector } from "react-redux";

// react
import { useEffect, useState } from "react";

// lodash
import _ from "lodash";

// react icons
import { IoMdAdd } from "react-icons/io";
import { TbCancel } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

// toast
import toast from "react-hot-toast";

function CreateNewItem({ taskEditDefaultData, formAction, itemName, closeFunc }) {
    const userDetails = useSelector(getUserDetails)
    const allUsers = useSelector(getAllUsersData)
    const Categories = useSelector(getCategoriesData)
    const tasksData = useSelector(getTasksData)
    const projectsData = useSelector(getProjectsData)
    const { userRole } = useUserRole(taskEditDefaultData?.access, userDetails?.id)

    const [selectUsersData, setSelectedUsersData] = useState(() => {
        const res = allUsers.filter((user) => user.id !== userDetails.id)
        return res;
    })

    // categories options
    const categoriesOptions = Categories.map((cat) => {
        return { value: cat.id, label: cat.title }
    })

    const defaultValues = formAction === "editItem" ? {
        title: taskEditDefaultData?.title,
        description: taskEditDefaultData?.description,
        priority: taskEditDefaultData?.priority,
        privacy: taskEditDefaultData?.privacy,

        editorUser: taskEditDefaultData?.access?.editors?.map(user => ({
            value: user.id,
            label: user.email
        })),
        viewerUser: taskEditDefaultData?.access?.viewers?.map(user => ({
            value: user.id,
            label: user.email
        })),
        labels: taskEditDefaultData?.labels?.map((lab) => {
            return { value: lab, label: lab }
        }),

        category: { value: taskEditDefaultData?.category?.id, label: taskEditDefaultData?.category?.name },

        projectLinkedTasks: taskEditDefaultData?.linkedTasks?.map((task) => {
            return { value: task.id, label: task.title }
        }),

        categoriesLinkedTasks: taskEditDefaultData?.linkedTasks?.map((task) => {
            return { value: task?.id, label: task?.title }
        }),
        stars: taskEditDefaultData?.stars,
        dueDate: taskEditDefaultData?.dueDate,
    } : {
        title: "",
        description: "",
        priority: "",
        privacy: "",
        editorUser: [],
        viewerUser: [],
        labels: [],
        category: null,
        projectLinkedTasks: [],
        categoriesLinkedTasks: [],
        stars: 0,
        dueDate: null,
    }

    const {
        register,
        setFocus,
        setValue,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues
    });

    // watch privacy input to handle roll based access
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchPrivacy = watch("privacy")

    // watch category input to handle roll based access
    const watchCategory = watch("category")

    // watch editors users and viewers, if user select any user in editors he can not select this user again
    const watchEditor = watch("editorUser")
    const watchViewers = watch("viewerUser")

    const selectedUserIdsForTasks = [
        ...(watchEditor || []),
        ...(watchViewers || [])
    ].map(u => u.value);

    // tasks options
    const tasksOptions = tasksData
        .filter(task => {
            if (itemName !== "project") return true;

            if (selectedUserIdsForTasks.length === 0) {
                return task.userId === userDetails?.id;
            }

            return selectedUserIdsForTasks.some(userId =>
                task.userId === userId ||
                task.access?.editors?.some(e => e.id === userId) ||
                task.access?.viewers?.some(v => v.id === userId)
            );
        })
        .map((task) => {
            return { value: task.id, label: task.title }
        });

    // let selectUsersData =
    useEffect(() => {
        if (!allUsers || !userDetails) return;

        let availableUsers = allUsers.filter(user => user.id !== userDetails.id);

        const selectedIds = [
            ...(watchEditor?.map(u => u.value) || []),
            ...(watchViewers?.map(u => u.value) || [])
        ];

        availableUsers = availableUsers.filter(user => !selectedIds.includes(user.id));

        setSelectedUsersData(availableUsers);

    }, [allUsers, userDetails, watchEditor, watchViewers]);

    // handle reset form
    function handleResetFrom() {
        setValue("title", "");
        setValue("description", "");
        setValue("priority", "");
        setValue("privacy", "");
        setValue("editorUser", []);
        setValue("viewerUser", []);
        setValue("labels", []);
        setValue("category", null);
        setValue("projectLinkedTasks", []);
        setValue("categoriesLinkedTasks", []);
        setValue("stars", 0);
        setValue("dueDate", null);
    }

    // handle submit the form
    function handleSubmitTheForm(itemData) {
        if (itemName === "task") {

            function mapUsers(users) {
                if (!Array.isArray(users) || users.length === 0) return [];

                return users.map(user => ({
                    id: user.value,
                    email: user.label
                }));
            }

            const access = {
                owner: userDetails.id,
                editors: mapUsers(itemData.editorUser),
                viewers: mapUsers(itemData.viewerUser),
            };

            const taskRelatedCategory = Categories?.filter((cat) => cat.id === watchCategory.value)

            if (formAction === "editItem") {

                const editedTaskData = {
                    ...taskEditDefaultData,
                    access,
                    title: itemData.title,
                    description: itemData.description,
                    priority: itemData.priority,
                    dueDate: itemData.dueDate,
                    privacy: itemData.privacy,
                    category: { name: itemData?.category?.label, id: itemData?.category?.value },
                    labels: Array.isArray(itemData.labels)
                        ? itemData.labels.map(lab => lab.label)
                        : [],
                }

                if (_.isEqual(editedTaskData, taskEditDefaultData)) {
                    toast.error("No changes were made", { id: "no-changes" });
                    return;
                }

                // handle update the task based on user role
                if (userRole === "owner") {
                    updateData("tasks", taskEditDefaultData.id, editedTaskData)
                } else if (userRole === "editor") {
                    updateData("tasks", taskEditDefaultData.id, { ...editedTaskData, access: taskEditDefaultData?.access, userId: taskEditDefaultData?.userId })
                }

                if (taskRelatedCategory.length > 0) {
                    // check if task is exist in the taskRelatedCategory linked tasks
                    const taskRelatedCategoryLinkedTasks = taskRelatedCategory[0].linkedTasks

                    // first remove from all another categories
                    Categories.forEach(async (cat) => {
                        if (cat.linkedTasks?.find((linkedTask) => linkedTask.id === taskEditDefaultData.id)) {
                            await updateData("categories", cat.id, { ...cat, linkedTasks: cat.linkedTasks.filter((linkedTask) => linkedTask.id !== taskEditDefaultData.id) })
                        }
                    })

                    // second add the task to the new category
                    if (!taskRelatedCategoryLinkedTasks.some((task) => task.id === taskEditDefaultData.id)) {
                        updateData("categories", taskRelatedCategory[0].id, { ...taskRelatedCategory[0], linkedTasks: [...taskRelatedCategory[0].linkedTasks, { title: editedTaskData.title, id: editedTaskData.id }] })
                    } else {
                        closeFunc()
                        return
                    }
                }
                closeFunc()
                toast.success("edited successfully", { id: "edit" })
            }

            if (formAction === "addNewItem") {

                const newTask = {
                    userId: userDetails.id,
                    access,
                    title: itemData.title,
                    description: itemData.description,
                    isCompleted: false,
                    priority: itemData.priority,
                    dueDate: itemData.dueDate,
                    createdAt: new Date().toISOString(),
                    privacy: itemData.privacy,
                    category: { name: itemData?.category?.label, id: itemData?.category?.value },
                    labels: Array.isArray(itemData.labels)
                        ? itemData.labels.map(lab => lab.label)
                        : [],
                    comments: [],
                }

                async function addNewTask() {
                    const taskId = await createDocument("tasks", newTask)
                    if (taskRelatedCategory.length > 0) {
                        updateData("categories", taskRelatedCategory[0].id, { ...taskRelatedCategory[0], linkedTasks: [...taskRelatedCategory[0].linkedTasks, { title: newTask.title, id: taskId }] })
                    }
                    handleResetFrom()
                    closeFunc()
                }

                addNewTask()
            }
        }

        if (itemName === "category") {

            // check number of stars
            if (itemData.stars > 5) {
                toast.error("number of stars must be less than or equal to 5", { id: "stars" })
                return;
            }

            if (formAction === "editItem") {

                const editCategory = {
                    ...taskEditDefaultData,
                    title: itemData?.title,
                    description: itemData?.description,
                    stars: itemData?.stars,
                }

                if (_.isEqual(editCategory, taskEditDefaultData)) {
                    toast.error("No changes detected", { id: "changes" })
                    return;
                }

                // check if there is category with this title
                const isCategoryExist = Categories.find((cat) => cat.title === itemData?.title)
                if (isCategoryExist) {
                    toast.error("category with this title already exists", { id: "category-exist" })
                    return;
                }

                updateData("categories", taskEditDefaultData.id, editCategory)
                closeFunc()
                toast.success("edited successfully", { id: "edit" })
            }

            if (formAction === "addNewItem") {

                const newCategory = {
                    createdAt: new Date().toISOString(),
                    linkedTasks: [],
                    userId: userDetails.id,
                    title: itemData?.title,
                    description: itemData?.description,
                    stars: itemData?.stars,
                }

                // check if there is category with this title
                const isCategoryExist = Categories.find((cat) => cat.title === itemData?.title)
                if (isCategoryExist) {
                    toast.error("category with this title already exists", { id: "category-exist" })
                    return;
                }

                async function addNewCategory() {
                    await createDocument("categories", newCategory)
                    handleResetFrom()
                    closeFunc()
                }

                addNewCategory()
            }
        }

        if (itemName === "project") {

            function mapUsers(users) {
                if (!Array.isArray(users) || users.length === 0) return [];

                return users.map(user => ({
                    id: user.value,
                    email: user.label
                }));
            }

            const access = {
                owner: userDetails.id,
                editors: mapUsers(itemData.editorUser),
                viewers: mapUsers(itemData.viewerUser),
            };

            function getProjectLinkedTasks() {
                const formTasks = itemData?.projectLinkedTasks;
                if (Array.isArray(formTasks) && formTasks.length > 0) {
                    return formTasks?.map((task) => {
                        return { id: task.value, title: task.label }
                    })
                }
                return [];
            }

            if (formAction === "editItem") {
                const tasks = getProjectLinkedTasks()

                const editProject = {
                    ...taskEditDefaultData,
                    title: itemData?.title,
                    description: itemData?.description,
                    access,
                    dueDate: itemData?.dueDate,
                    priority: itemData?.priority,
                    linkedTasks: tasks ? tasks : [],
                    privacy: itemData?.privacy
                }

                if (_.isEqual(editProject, taskEditDefaultData)) {
                    toast.error("No changes detected", { id: "changes" })
                    return;
                }

                // handle update the task based on user role
                if (userRole === "owner") {
                    updateData("projects", taskEditDefaultData.id, editProject)
                } else if (userRole === "editor") {
                    updateData("projects", taskEditDefaultData.id, { ...editProject, access: taskEditDefaultData?.access, userId: taskEditDefaultData?.userId, privacy: taskEditDefaultData?.privacy })
                }

                closeFunc()
                toast.success("edited successfully", { id: "edit" })
            }

            if (formAction === "addNewItem") {
                const tasks = getProjectLinkedTasks()

                const newProject = {
                    access,
                    comments: [],
                    createdAt: new Date().toISOString(),
                    description: itemData?.description,
                    dueDate: itemData?.dueDate,
                    isCompleted: false,
                    linkedTasks: tasks ? tasks : [],
                    priority: itemData?.priority,
                    privacy: itemData?.privacy,
                    progress: "0",
                    title: itemData?.title,
                    userId: userDetails.id,
                }

                // check if there is project with this title
                const isProjectExist = projectsData.find((project) => project.title === itemData?.title)
                if (isProjectExist) {
                    toast.error("project with this title already exists", { id: "project-exist" })
                    return;
                }

                async function addNewProject() {
                    await createDocument("projects", newProject)
                    handleResetFrom()
                    closeFunc()
                }

                addNewProject()
            }
        }

    }

    // stop close the popup if the user click inside form
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    // focus to email when open email
    useEffect(() => {
        setFocus("title");
    }, [setFocus]);
    return (
        <div className={styles.overlay} onClick={closeFunc}>
            <div className={styles.createNewItem} onClick={handleModalClick}>
                <div className={styles.absoluteCloseBtn}>
                    <MainButton title="closePopup" type="button" content={<><AiOutlineCloseCircle /></>} clickEvent={closeFunc} />
                </div>
                <div className={styles.header}>
                    <h2>{formAction === "editItem" ? `Edit ${itemName}` : `Create new ${itemName}`}</h2>
                    <p>{formAction === "editItem" ? `here you can edit your ${itemName}, enjoy the experience now` : `here you can create new ${itemName}, enjoy the experience now`}</p>
                </div>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(handleSubmitTheForm)}>
                        <MainInput
                            type={"text"}
                            name={"title"}
                            placeholder={`${itemName} title...`}
                            title={"title"}
                            register={register("title", {
                                required: "title is required",
                                maxLength: {
                                    value: 80,
                                    message: "title must be lower than 80 letters"
                                }
                            })}
                        />
                        {errors.title && (
                            <p className="error">{errors.title.message}</p>
                        )}

                        <MainInput
                            type={"text"}
                            name={"description"}
                            placeholder={`${itemName} description...`}
                            title={"description"}
                            register={register("description", {
                                required: "description is required",
                            })}
                        />
                        {errors.description && (
                            <p className="error">{errors.description.message}</p>
                        )}
                        {
                            itemName !== "category" && (
                                <>
                                    <div className={styles.dueDate}>
                                        <Controller
                                            name="dueDate"
                                            control={control}
                                            rules={{ required: "Please select a date and time" }}
                                            render={({ field, fieldState }) => (
                                                <DateTimePicker
                                                    field={{ ...field, error: fieldState.error }}
                                                    label="Due Date"
                                                    placeholder="Select due date..."
                                                />
                                            )}
                                        />
                                        {errors.dueDate && (
                                            <p className="error">{errors.dueDate.message}</p>
                                        )}
                                    </div>

                                    <div className={styles.flexUserOptions}>
                                        <div className={styles.priority}>
                                            <select name="priority" {...register("priority", {
                                                required: "priority is required",
                                            })}>
                                                <option value="" disabled>Priority</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                            {errors.priority && (
                                                <p className="error">{errors.priority.message}</p>
                                            )}
                                        </div>

                                        {(userRole === "owner" || !userRole) && (
                                            <div className={styles.Privacy}>
                                                <select name='privacy' {...register("privacy", {
                                                    required: "privacy is required",
                                                })}>
                                                    <option value="" disabled>Privacy</option>
                                                    <option value="private">Private</option>
                                                    <option value="global">Global</option>
                                                </select>
                                                {errors.privacy && (
                                                    <p className="error">{errors.privacy.message}</p>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                    {(userRole === "owner" || !userRole) && (
                                        watchPrivacy !== "private" && (
                                            <div className={styles.flexRoleBased}>
                                                <div className={styles.editor}>
                                                    <Controller
                                                        name="editorUser"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <UserSelect data={selectUsersData} field={field} fieldName="editors" />
                                                        )}
                                                    />
                                                </div>
                                                <div className={styles.viewer}>
                                                    <Controller
                                                        name="viewerUser"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <UserSelect data={selectUsersData} field={field} fieldName="viewers" />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {
                                        itemName === "task" && (
                                            <div className={styles.flexCategories}>
                                                <div className={styles.Categories}>
                                                    <Controller
                                                        name="category"
                                                        control={control}
                                                        isMulti
                                                        rules={{ required: "Please select at least one category" }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                onChange={(selected) => field.onChange(selected)}
                                                                value={field.value}
                                                                options={categoriesOptions}
                                                                placeholder="select category..."
                                                                isSearchable
                                                                isClearable
                                                                styles={customStyles}
                                                            />
                                                        )}
                                                    />
                                                    {errors.category && (
                                                        <p className="error">{errors.category.message}</p>
                                                    )}
                                                </div>
                                                <div className={styles.labels}>
                                                    <Controller
                                                        name="labels"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <CreatableSelect
                                                                {...field}
                                                                onChange={(selected) => field.onChange(selected)}
                                                                value={field.value}
                                                                isMulti
                                                                placeholder="Type and press enter to add labels..."
                                                                isClearable
                                                                styles={customStyles}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>)
                                    }
                                    {
                                        itemName === "project" && (
                                            <div className={styles.linkedTasks}>
                                                <Controller
                                                    name="projectLinkedTasks"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            onChange={(selected) => field.onChange(selected)}
                                                            value={field.value}
                                                            options={tasksOptions}
                                                            placeholder="select task...."
                                                            isSearchable
                                                            isClearable
                                                            isMulti
                                                            styles={customStyles}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                        {
                            itemName === "category" && (
                                <>
                                    <div className={styles.stars}>
                                        <span className={styles.setCategoryStarsLabel}>set Category stars</span>
                                        <MainInput
                                            type={"number"}
                                            name={"stars"}
                                            placeholder={"0/5 stars"}
                                            title={"stars number"}
                                            register={register("stars", {
                                                required: "stars number is required",
                                                max: 5,
                                                min: 0
                                            })} />
                                    </div>
                                </>
                            )
                        }

                        <div className={styles.flexButtonContainer}>
                            {
                                formAction === "addNewItem" && (
                                    <>
                                        <MainButton title="cancel" type="button" content={<>cancel <span><TbCancel /></span></>} clickEvent={() => handleResetFrom()} />
                                        <MainButton title="add new task" type="submit" content={<>Add <span><IoMdAdd /></span></>} />
                                    </>
                                )
                            }
                            {
                                formAction === "editItem" && (
                                    <>
                                        <MainButton title="edit item" type="submit" content={<>save changes <span><MdEdit /></span></>} />
                                    </>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewItem;