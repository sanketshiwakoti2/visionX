"use client";

import { submitContactForm } from "@/app/actions/contact";
// @ts-ignore
import { useFormState } from "react-dom";
// @ts-ignore
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef } from "react";

const initialState = {
    success: false,
    message: ""
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm w-full transition-colors disabled:opacity-50"
        >
            {pending ? <Loader2 size={14} className="animate-spin" /> : <>Send Message <Send size={14} /></>}
        </button>
    );
}

export default function ContactForm() {
    const [state, formAction] = useFormState(submitContactForm, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <div>
            {state.success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg text-sm mb-4">
                    {state.message}
                </div>
            )}
            {state.message && !state.success && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                    {state.message}
                </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-3">
                <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-indigo-200/30 focus:outline-none focus:border-orange-400/50 text-sm"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-indigo-200/30 focus:outline-none focus:border-orange-400/50 text-sm"
                />
                <textarea
                    name="message"
                    placeholder="Message..."
                    rows={2}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-indigo-200/30 focus:outline-none focus:border-orange-400/50 text-sm resize-none"
                ></textarea>
                <SubmitButton />
            </form>
        </div>
    );
}
