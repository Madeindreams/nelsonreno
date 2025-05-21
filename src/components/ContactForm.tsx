import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';


const FormWrapper = styled(motion.div)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    border-top: 2px solid #ccc;
    padding: 2rem;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.1);
    z-index: 100;
`;

const Form = styled.form`
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    resize: vertical;
    min-height: 100px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    &.submit {
        background-color: #0d6efd;
        color: #fff;
    }

    &.cancel {
        background-color: #6c757d;
        color: #fff;
    }
`;

interface ContactFormProps {
    visible: boolean;
    onClose: () => void;
}

const ContactForm = ({ visible, onClose }: ContactFormProps) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const message = `
Name: ${formData.name}
Email: ${formData.email}
Message:
${formData.message}
    `.trim();

        try {
            const response = await fetch('https://node-mailer-uwgi.onrender.com/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            onClose(); // hide form
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <AnimatePresence>
            {visible && (
                <FormWrapper
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.4 }}
                >
                    <Form onSubmit={handleSubmit}>
                        <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                        <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                        <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
                        {loading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
                                <div className="spinner-border text-primary" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                Sending message...
                            </div>
                        )}
                        <ButtonGroup>
                            <Button type="button" className="cancel" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" className="submit" disabled={loading}>
                                Send
                            </Button>
                        </ButtonGroup>
                    </Form>
                </FormWrapper>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;
