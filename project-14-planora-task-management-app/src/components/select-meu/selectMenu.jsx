// local
import styles from "./selectMenu.module.css"

import AsyncSelect from "react-select/async";

const UserSelect = ({ data, field}) => {

    // function to filter options based on input
    const loadOptions = (inputValue) => {
        if (!inputValue) return []; 

        const filtered = data
            .filter(user =>
                user.email.toLowerCase().includes(inputValue.toLowerCase())
            )
            .slice(0, 15)
            .map(user => ({
                value: user.id,
                label: user.email,
                name:user.name
            }));

        return Promise.resolve(filtered);
    };

    return (
        <AsyncSelect
            {...field}
            value={field.value}
            onChange={field.onChange}
            loadOptions={loadOptions}
            cacheOptions
            isMulti
            defaultOptions={false}
            placeholder="Search user email...."
            isClearable= {true}
        />
    );
};

export default UserSelect;
