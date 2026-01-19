// local
import styles from "./selectMenu.module.css"
import { customStyles } from "./selectStyles";

import AsyncSelect from "react-select/async";

const UserSelect = ({ data =[], field, fieldName }) => {


    // function to filter options based on input
    const loadOptions = (inputValue) => {
        if (!inputValue) return [];

        const filtered = data?.filter(user =>
                user.email.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 15)
            .map(user => ({
                value: user.id,
                label: user.email
            }));

        return Promise.resolve(filtered);
    };

    return (
        <div className={styles.selectContainer}>
            <AsyncSelect
                {...field}
                value={field.value}
                onChange={field.onChange}
                loadOptions={loadOptions}
                cacheOptions
                isMulti
                defaultOptions={false}
                placeholder={`select ${fieldName} users by email....`}
                isClearable={true}
                styles={customStyles}
                classNames={{
                    container: () => styles.selectWrapper
                }}
            />
        </div>
    );
};

export default UserSelect;
