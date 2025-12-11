// local
import styles from './Profile.module.css';
import MainButton from '../../components/ui/button/mainButton';
import { getLoginUserData } from "../../redux/usersSlice"

// redux
import { useSelector } from 'react-redux';

// react
import { useEffect, useState } from 'react';

// react icons
import { RxAvatar } from 'react-icons/rx';
import { FaPen } from 'react-icons/fa';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

// toast
import toast from 'react-hot-toast';

const initialValues = {
    img: "",
    email: "hoda@gmail.com",
    online: true,
    userName: "Mahmoud Said",
    displayName: "hoda1",
    country: "egypt",
    phone: "01093650499"
}

const Profile = () => {
    const user = useSelector(getLoginUserData)
    const [userData, setUserData] = useState(() => {
        if (user) {
            return {...user, img: ""}
        }
        return {}
    });
    console.log(    userData)
    const [editMode, setEditMode] = useState({});

    // Toggle edit mode for a specific field
    const handleEditClick = (field) => {
        setEditMode(prev => ({ ...prev, [field]: true }));
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    // Save changes
    const handleSave = () => {
        setEditMode({});
        toast.success("Profile updated successfully!");
        // Here you would typically dispatch an action or call an API to update the user
    };

    // Cancel changes
    const handleCancel = () => {
        setUserData(user);
        setEditMode({});
        toast('Changes cancelled', { icon: 'ℹ️' });
    };
    // Render a profile field
    const renderField = (label, name, value, type = "text") => {
        const isEditing = editMode[name];
        return (
            <div className={styles.fieldRow}>
                <div className={styles.labelContainer}>
                    <label>{label}</label>
                </div>
                <div className={styles.valueContainer}>
                    {isEditing ? (
                        <input
                            type={type}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            className={styles.input}
                            autoFocus
                        />
                    ) : (
                        <span className={styles.value}>{value}</span>
                    )}
                </div>
                <div className={styles.actionContainer}>
                    {!isEditing && (
                        <button
                            className={styles.editBtn}
                            onClick={() => handleEditClick(name)}
                            title="Edit"
                        >
                            <FaPen />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.avatarSection}>
                    {userData.img ? (
                        <img src={userData.img} alt="Profile" className={styles.avatarImg} />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            <RxAvatar />
                        </div>
                    )}
                    <h2>{userData.userName}</h2>
                    <span className={userData.online ? styles.online : styles.offline}>
                        {userData.online ? "Online" : "Offline"}
                    </span>
                </div>

                <div className={styles.infoSection}>
                    {renderField("Display Name", "displayName", userData.displayName)}
                    {renderField("Email", "email", userData.email, "email")}
                    {renderField("Phone", "phone", userData.phone, "tel")}
                    {renderField("Country", "country", userData.country)}
                </div>

                <div className={styles.footer}>
                    {Object.keys(editMode).length > 0 && (
                        <>
                            <MainButton
                                type="button"
                                children={<><MdCancel /> Cancel</>}
                                className={styles.cancelBtn}
                                onclick={handleCancel}
                            />
                            <MainButton
                                type="button"
                                children={<><FaSave /> Save Changes</>}
                                onclick={handleSave}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
