export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label {...props} className={`input-area_label ` +className}>
            {value ? value : children}
        </label>
    );
}
