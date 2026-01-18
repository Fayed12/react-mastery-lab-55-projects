export const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "var(--bg-100)",
        borderColor: state.isFocused ? "var(--primary-500)" : "var(--border-200)",
        borderRadius: "var(--radius-md)",
        padding: "2px",
        boxShadow: state.isFocused ? "0 0 0 2px var(--primary-100)" : "none",
        "&:hover": {
            borderColor: "var(--primary-400)"
        },
        color: "var(--text-700)"
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "var(--bg-50)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-200)",
        zIndex: 9999
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "var(--primary-600)"
            : state.isFocused
                ? "var(--bg-200)"
                : "transparent",
        color: state.isSelected
            ? "#ffffff"
            : "var(--text-700)",
        cursor: "pointer",
        "&:active": {
            backgroundColor: "var(--primary-500)"
        }
    }),
    input: (base) => ({
        ...base,
        color: "var(--text-500)"
    }),
    singleValue: (base) => ({
        ...base,
        color: "var(--text-900)"
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "var(--primary-100)",
        borderRadius: "var(--radius-sm)",
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: "var(--primary-700)",
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: "var(--primary-500)",
        "&:hover": {
            backgroundColor: "var(--primary-200)",
            color: "var(--primary-700)",
        },
    }),
    placeholder: (base) => ({
        ...base,
        color: "var(--text-400)",
        fontSize:"var(--text-xs)"
    })
};
