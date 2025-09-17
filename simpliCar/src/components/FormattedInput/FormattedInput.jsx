import React, { useState, useEffect } from "react";

export default function FormattedInput({
    value,
    onChange,
    name,
    type = "text",
    formatFn = (val) => val,
    normalizeFn = (val) => val,
    ...rest
}) {
    const [editingValue, setEditingValue] = useState(value ?? "");

    function handleInputChange(e) {
        const val = normalizeFn ? normalizeFn(e.target.value) : e.target.value;
        setEditingValue(val);
        if (onChange) {
            onChange({ target: { name, value: val } });
        }
    }

    function handleBlur() {
        if (formatFn && editingValue !== "") {
            const formatted = formatFn(editingValue);
            setEditingValue(formatted);
            if (onChange) {
                onChange({ target: { name, value: formatted } });
            }
        }
    }

    function handleFocus() {
        if (formatFn) {
            let raw = editingValue.replace(/[R$\s]/g, "").replace(/\./g, "");
            setEditingValue(raw);
        }
    }

    useEffect(() => {
        setEditingValue(value ?? "");
    }, [value]);

    return (
        <input
            {...rest}
            type={type}
            name={name}
            value={editingValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            autoComplete="off"
        />
    );
}