"use client";

import React, { useState } from "react";
import { IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react";
import { Cover } from "./ui/cover";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";

const initialFormData = { id: "", name: "" };

export function SignupFormDemo() {
    const [formData, setFormData] = useState(initialFormData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field, value) => {
        setFormData((current) => ({ ...current, [field]: value }));
    };

    const isFormValid = Boolean(formData.id.trim() && formData.name.trim());

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        try {
            const response = await fetch("https://sheetdb.io/api/v1/48w7ohbmsb772", {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: [{ id: formData.id.trim(), name: formData.name.trim() }],
                }),
            });

            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            setMessage(<><strong>Student details submitted successfully</strong><br /><br />Your name has been added to the attendance list.</>);
            setFormData(initialFormData);
        } catch (error) {
            console.error("Error submitting student details:", error);
            setMessage(<><strong>Submission failed</strong><br /><br />Please try again or contact dheerajkum838@gmail.com.</>);
        } finally {
            setIsSubmitting(false);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className="mx-auto w-full max-w-96 rounded-none bg-transparent p-4 shadow-input md:rounded-2xl md:p-8">
            <h1 className="relative z-20 mx-auto mt-6 bg-clip-text py-6 text-center text-2xl font-semibold text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                <Cover>For the Ethics Course</Cover>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-neutral-300">
                Students whose names were missing from the attendance sheet can enter their student ID and name here. Their name will be added to the list.
            </p>

            <form className="mx-auto my-8 max-w-lg space-y-6" onSubmit={handleSubmit}>
                <Field label="Student ID" required>
                    <Input type="text" placeholder="Enter your student ID" value={formData.id} onChange={(event) => updateField("id", event.target.value)} required />
                </Field>

                <Field label="Student Name" required>
                    <Input type="text" placeholder="Enter your full name" value={formData.name} onChange={(event) => updateField("name", event.target.value)} required />
                </Field>

                <button disabled={isSubmitting || !isFormValid} className={`block h-11 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] ${isFormValid ? "bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900" : "cursor-not-allowed bg-gray-700"}`} type="submit">
                    {isSubmitting ? "Submitting..." : "Submit Details"}
                </button>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
                <div className="flex justify-between">
                    <a href="https://github.com/Dheerajkhatri69" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-300 hover:text-white"><IconBrandGithub size={20} /> GitHub</a>
                    <a href="https://www.instagram.com/dheerajxkhatri69/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-300 hover:text-white"><IconBrandInstagram size={20} /> Instagram</a>
                </div>
            </form>

            {isDialogOpen && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setIsDialogOpen(false)}>
                <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-neutral-200 shadow-xl" onClick={(event) => event.stopPropagation()}>
                    <h2 className="mb-3 text-lg font-semibold text-white">Submission Status</h2>
                    <div className="text-sm leading-6">{message}</div>
                    <button className="mt-6 rounded-md bg-white px-4 py-2 text-sm font-medium text-black" onClick={() => setIsDialogOpen(false)}>Close</button>
                </div>
            </div>}
        </div>
    );
}

function Field({ label, required, children }) {
    return <div className="flex flex-col gap-2"><Label className="text-white">{label} {required && <span className="ml-1 text-red-500">*</span>}</Label>{children}</div>;
}
