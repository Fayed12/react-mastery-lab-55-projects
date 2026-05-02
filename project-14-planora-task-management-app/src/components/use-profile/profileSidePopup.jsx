// local
import styles from './profileSidePopup.module.css';
import { getUserDetails } from '../../Redux/authUserSlice';
import { getAllUsersData } from '../../Redux/authUserSlice';
import updateData from '../../firebase/updateExistingData';
import MainButton from '../../ui/button/MainButton';

// react
import { useState } from 'react';
import ReactDOM from "react-dom";

// react icons
import { MdPerson, MdEmail, MdCalendarMonth, MdSettings, MdEdit, MdClose } from 'react-icons/md';

// toast
import toast from 'react-hot-toast';

// redux
import { useSelector } from 'react-redux';

const ProfileSidePopup = ({ isOpen = true, onClose = () => { } }) => {

    const userDetails = useSelector(getUserDetails)
    const allUsersData = useSelector(getAllUsersData)

    const user = allUsersData?.find((user) => user.email === userDetails.email)

    const [isEditing, setIsEditing] = useState(false);
    const [nameInput, setNameInput] = useState(user?.name);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateData("users", user?.id, { name: nameInput });
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setNameInput(user.name);
        setIsEditing(false);
    };

    const portalRoot = document.getElementById("portal-root") || document.body;

    return ReactDOM.createPortal(
        <>
            <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose}></div>
            <div className={`${styles.popupContainer} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2>User Profile</h2>
                    <button className={styles.closeBtn} onClick={onClose}><MdClose /></button>
                </div>

                <div className={styles.content}>
                    <div className={styles.infoGroup}>
                        <MdPerson className={styles.icon} />
                        <div className={styles.infoText}>
                            <label>Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className={styles.editInput}
                                />
                            ) : (
                                <span>{user?.name}</span>
                            )}
                        </div>
                        {!isEditing && (
                            <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                                <MdEdit />
                            </button>
                        )}
                    </div>

                    <div className={styles.infoGroup}>
                        <MdEmail className={styles.icon} />
                        <div className={styles.infoText}>
                            <label>Email</label>
                            <span>{user?.email}</span>
                        </div>
                    </div>

                    <div className={styles.infoGroup}>
                        <MdCalendarMonth className={styles.icon} />
                        <div className={styles.infoText}>
                            <label>Created At</label>
                            <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className={styles.infoGroup}>
                        <MdSettings className={styles.icon} />
                        <div className={styles.infoText}>
                            <label>User ID</label>
                            <span className={styles.idText}>{user?.id}</span>
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className={styles.actions}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <MainButton
                                type="button"
                                title="Cancel"
                                content="Cancel"
                                clickEvent={handleCancel}
                                isDisabled={loading}
                                action="secondary"
                            />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <MainButton
                                type="button"
                                title="Save"
                                content={loading ? "Saving..." : "Save"}
                                clickEvent={handleSave}
                                isDisabled={loading}
                                action="primary"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
        , portalRoot
    );
};

export default ProfileSidePopup;