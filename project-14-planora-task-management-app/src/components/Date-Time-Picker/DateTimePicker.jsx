// local
import styles from "./DateTimePicker.module.css"

// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// data fns
import { format } from "date-fns";

const DateTimePicker = ({ field, placeholder }) => {
    return (
        <div className={styles.datePickerContainer}>

            <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => {
                    // check if date is valid before formatting
                    if (date) {
                        const formattedDate = format(date, "yyyy-MM-dd");
                        field.onChange(formattedDate);
                    } else {
                        field.onChange(null);
                    }
                }}
                timeIntervals={15}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText={placeholder || "Select date & time"}
                wrapperClassName={styles.datePickerWrapper}
            />
        </div>
    );
};

export default DateTimePicker;
