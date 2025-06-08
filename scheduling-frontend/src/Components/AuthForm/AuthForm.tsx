import { RefObject, useState } from "react";
import Button from "../Button/Button";
import './AuthForm.css';
import { Eye, EyeClosed } from "lucide-react";

type InputField = {
    type: string;
    placeholder: string;
    id?: string;
    label?: string;
    required?: boolean;
    textArea?: boolean;
};

type FormProps = {
    title: string;
    fields: InputField[];
    refs?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>[];
    buttonText: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AuthForm({ title, fields, refs, buttonText, onSubmit }: FormProps){
    const [passwordVisibility, setPasswordVisibility] = useState<{ [key: number]: boolean }>({});

    const togglePasswordVisibility = (index: number) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="auth-form-title">{title}</h2>
            <div className="input-container">
                {fields.map((field, index) => (
                    <div key={index} className={field.label ? 'optional-fields-container' : ''}>
                        {field.label && <label htmlFor={field.id}>{field.label}</label>}
                        {field.textArea ? (
                            <textarea ref={refs?.[index] as RefObject<HTMLTextAreaElement>} placeholder={field.placeholder} id={field.id} required={field.required} />
                            ) : (
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input ref={refs?.[index] as RefObject<HTMLInputElement>} type={field.type === 'password' && passwordVisibility[index] ? 'text' : field.type} placeholder={field.placeholder} id={field.id} required={field.required} />
                                {field.type === 'password' && (
                                    <div style={{ position: 'absolute', right: 0, marginRight: '0.5rem', cursor: 'pointer'}} onClick={() => togglePasswordVisibility(index)}>
                                        {passwordVisibility[index] ? <Eye /> : <EyeClosed />}
                                    </div>
                                )}
                            </div>
                            )}
                    </div>
                ))}
                <Button type='submit'>{buttonText}</Button>
            </div>
        </form>
    );
}