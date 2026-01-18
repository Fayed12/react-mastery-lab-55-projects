import styles from "./createEditNewItem.module.css"
import MainInput from "../../ui/input/MainInput"
import MainButton from "../../ui/button/MainButton"
import UserSelect from "../select-meu/selectMenu";
import { customStyles } from "../select-meu/selectStyles";
import { getAllUsersData, getUserDetails } from "../../Redux/authUserSlice";
import { getCategoriesData } from "../../Redux/categoriesSlice";
import { getTasksData } from "../../Redux/tasksSlice";
import DateTimePicker from "../Date-Time-Picker/DateTimePicker";
import createDocument from "../../firebase/addNewData";
import updateData from "../../firebase/updateExistingData";

// react hook form
import { useForm, Controller } from "react-hook-form";

// react select
import Select from "react-select"
import CreatableSelect from "react-select/creatable";

// redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
    console.log(taskEditDefaultData)

    // categories options
    const categoriesOptions = Categories.map((cat) => {
        return { value: cat.id, label: cat.title }
    })

    // tasks options
    const tasksOptions = tasksData.map((task) => {
        return { value: task.id, label: task.title, description: task.description, userId: task.userId }
    })

    const defaultValues = formAction === "editItem" ? {
        title: taskEditDefaultData?.title,
        description: taskEditDefaultData?.description,
        priority: taskEditDefaultData?.priority,
        privacy: taskEditDefaultData?.privacy,

        editorUser: taskEditDefaultData?.editors?.map(user => ({
            value: user.id,
            label: user.email,
            name: user.name
        })),
        viewerUser: taskEditDefaultData?.viewers?.map(user => ({
            value: user.id,
            label: user.email,
            name: user.name
        })),
        labels: taskEditDefaultData?.labels?.map((cat) => {
            return { value: cat, label: cat }
        }),

        categories: taskEditDefaultData?.categories?.map((cat) => {
            return { value: cat, label: cat }
        }),
        // projectLinkedTasks: taskEditDefaultData?.map((task) => {
        //     return { value: task.id, label: task.title, description: task.description, userId: task.userId }
        // }),
        // categoriesLinkedTasks: taskEditDefaultData?.map((task) => {
        //     return { value: task.id, label: task.title, description: task.description, userId: task.userId }
        // }),
        // stars: taskEditDefaultData?,
        dueDate: taskEditDefaultData?.dueDate,
    } : {
        title: "",
        description: "",
        priority: "",
        privacy: "",
        editorUser: [],
        viewerUser: [],
        labels: [],
        categories: [],
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
        formState: { errors },
    } = useForm({
        defaultValues
    });

    // handle reset form
    function handleResetFrom() {
        setValue("title", "");
        setValue("description", "");
        setValue("priority", "");
        setValue("privacy", "");
        setValue("editorUser", []);
        setValue("viewerUser", []);
        setValue("labels", []);
        setValue("categories", []);
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
                    email: user.label,
                }));
            }

            const access = {
                owner: userDetails.id,
                editors: mapUsers(itemData.editorUser),
                viewers: mapUsers(itemData.viewerUser),
            };

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
                categories: Array.isArray(itemData.categories)
                    ? itemData.categories.map(cat => cat.label)
                    : [],
                labels: Array.isArray(itemData.labels)
                    ? itemData.labels.map(lab => lab.label)
                    : [],
                comments: [],
            }

            if (formAction === "editItem") {
                updateData("tasks", taskEditDefaultData.id, newTask)
                closeFunc()
                toast.success("edited successfully", {id:"edit"})
            }

            if (formAction === "addNewItem") {
                async function addNewTask() {
                    await createDocument("tasks", newTask)
                    handleResetFrom()
                    closeFunc()
                }

                addNewTask()
            }
        }
        // if (itemName === "project") {

        // }
        // if (itemName === "category") {

        // }
    }

    // stop close the popup if the user click inside form
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    // // handle update item
    // function handleUpdateItem() {
    //     if (itemName === "task") {
    //         updateData("tasks", taskEditDefaultData.id,)
    //     }
    // }

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
                    <h2>Create new {itemName}</h2>
                    <p>here you can create new tasks or project and categories, Enjoy the experience now</p>
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
                                    </div>
                                    <div className={styles.flexRoleBased}>
                                        <div className={styles.editor}>
                                            <Controller
                                                name="editorUser"
                                                control={control}
                                                render={({ field }) => (
                                                    <UserSelect data={allUsers} field={field} />
                                                )}
                                            />
                                        </div>
                                        <div className={styles.viewer}>
                                            <Controller
                                                name="viewerUser"
                                                control={control}
                                                render={({ field }) => (
                                                    <UserSelect data={allUsers} field={field} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    {
                                        itemName === "task" && (
                                            <div className={styles.flexCategories}>
                                                <div className={styles.Categories}>
                                                    <Controller
                                                        name="categories"
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
                                                    {errors.categories && (
                                                        <p className="error">{errors.categories.message}</p>
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
                                    <div className={styles.linkedTasks}>
                                        <Controller
                                            name="categoriesLinkedTasks"
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
                                    <div className={styles.stars}>
                                        <span>set Category stars</span>
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