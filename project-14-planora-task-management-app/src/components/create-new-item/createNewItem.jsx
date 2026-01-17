// local
import styles from "./createNewItem.module.css"
import MainInput from "../../ui/input/MainInput"
import MainButton from "../../ui/button/MainButton"
import UserSelect from "../select-meu/selectMenu";
import { getAllUsersData, getUserDetails } from "../../Redux/authUserSlice";
import { getCategoriesData } from "../../Redux/categoriesSlice";
import { getTasksData } from "../../Redux/tasksSlice";
import DateTimePicker from "../Date-Time-Picker/DateTimePicker";
import createDocument from "../../firebase/addNewData";

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

function CreateNewItem({ itemName, closeFunc }) {
    const userDetails = useSelector(getUserDetails)
    const allUsers = useSelector(getAllUsersData)
    const Categories = useSelector(getCategoriesData)
    const tasksData = useSelector(getTasksData)

    // categories options
    const categoriesOptions = Categories.map((cat) => {
        return { value: cat.id, label: cat.title }
    })

    // tasks options
    const tasksOptions = tasksData.map((task) => {
        return { value: task.id, label: task.title }
    })

    const {
        register,
        setFocus,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
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

    });

    // handle reset form
    function handleResetFrom() {
        setValue("title", "");
        setValue("description", "");
        setValue("priority", "");
        setValue("privacy", "null");
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

            // do not forget id
            // do not forget id
            // do not forget id
            // do not forget id
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

            async function addNewTask() {
                await createDocument("tasks", newTask)
                handleResetFrom()
                closeFunc()
            }

            addNewTask()
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
                    <h2>Create new {itemName.toUpperCase()}</h2>
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
                            <MainButton title="add new task" type="submit" content={<>Add <span><IoMdAdd /></span></>} />
                            <MainButton title="cancel" type="button" content={<>cancel <span><TbCancel /></span></>} clickEvent={() => handleResetFrom()} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewItem;