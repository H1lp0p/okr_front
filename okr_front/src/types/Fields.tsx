import { ChangeEvent } from "react";

type DefaultField = {
    id: string;
    value: string;
    error: null | string;
    hasError: () => Promise<boolean>;
};

type TextField = DefaultField &{
    handleChange: (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    )=> void;
    handleBlur: () => void;
};

export default TextField;