import { Children, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextSelect(
    { type = 'select', className = '', isFocused = false, children, ...props},
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={`input-area_select ${className}`}
            ref={localRef}
        >
            {children}
        </select>
    );
});
