// local
import styles from "./DateTimePicker.module.css"

// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// data fns
import { format } from "date-fns";

const DateTimePicker = ({ field, label, placeholder}) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            {label && <label style={{ display: "block", marginBottom: "4px" }}>{label}</label>}

            <DatePicker
                {...field}
                selected={field.value}
                onChange={(date) => {
                    const formattedDate = format(date, "yyyy-MM-dd");
                    field.onChange(formattedDate);
                }}
                timeIntervals={15}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText={placeholder || "Select date & time"}
                className="react-datepicker-input"
            />

            {field?.error && (
                <p style={{ color: "red", marginTop: "4px" }}>{field.error.message}</p>
            )}
        </div>
    );
};

export default DateTimePicker;
