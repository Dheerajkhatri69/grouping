"use client";

import React, { useState } from "react";
import { IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react";
import { Cover } from "./ui/cover";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const languages = [
    "JavaScript", "TypeScript", "Python", "C++", "Java", "C#", "Go", "Rust", "PHP", "Other",
].map((language) => ({ label: language, value: language }));

const nextLanguages = ["Rust", "Go", "TypeScript", "Kotlin", "Swift", "Python", "Zig", "Other"].map(
    (language) => ({ label: language, value: language })
);

const roles = ["Student", "Junior Developer", "Senior Developer", "Freelancer", "Hobbyist", "Other"].map(
    (role) => ({ label: role, value: role })
);

const domains = [
    "Web Development", "Mobile Development", "Data Science / AI / ML", "Game Development", "Systems / Embedded", "DevOps / Cloud",
].map((domain) => ({ label: domain, value: domain }));

const experienceOptions = ["< 1 year", "1–3 years", "3–5 years", "5+ years"].map((experience) => ({
    label: experience,
    value: experience,
}));

const choiceFactors = [
    "Performance", "Syntax / Ease of Use", "Job Market Opportunities", "Ecosystem / Libraries", "Strong Community Support",
].map((factor) => ({ label: factor, value: factor }));

const editors = [
    "VS Code", "JetBrains IDEs (IntelliJ, WebStorm, PyCharm)", "Neovim / Vim", "Visual Studio", "Xcode", "Cursor",
].map((editor) => ({ label: editor, value: editor }));

const initialFormData = {
    currentRole: "",
    codingExperience: "",
    primaryDomain: "",
    primaryLanguage: "",
    favoriteLanguage: "",
    secondaryLanguages: [],
    frustratingLanguage: "",
    frustratingReason: "",
    nextLanguage: "",
    languageChoiceFactor: "",
    favoriteTools: "",
    preferredEditor: "",
    aiImpact: "",
};

export function SignupFormDemo() {
    const [formData, setFormData] = useState(initialFormData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field, value) => {
        setFormData((current) => ({ ...current, [field]: value }));
    };

    const toggleSecondaryLanguage = (language) => {
        const selected = formData.secondaryLanguages.includes(language)
            ? formData.secondaryLanguages.filter((item) => item !== language)
            : [...formData.secondaryLanguages, language];
        updateField("secondaryLanguages", selected);
    };

    const isFormValid = () => Boolean(
        formData.currentRole && formData.codingExperience && formData.primaryDomain &&
        formData.primaryLanguage && formData.favoriteLanguage && formData.frustratingLanguage &&
        formData.frustratingReason.trim() && formData.nextLanguage && formData.languageChoiceFactor &&
        formData.favoriteTools.trim() && formData.preferredEditor && formData.aiImpact
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid()) {
            setMessage(<><strong>Please complete the survey</strong><br /><br />Fill in every required field before submitting.</>);
            setIsDialogOpen(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("https://sheetdb.io/api/v1/48w7ohbmsb772", {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: [{ ...formData, secondaryLanguages: formData.secondaryLanguages.join(", ") }],
                }),
            });

            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            setMessage(<><strong>Survey submitted successfully</strong><br /><br />Thank you for sharing your developer perspective.</>);
            setFormData(initialFormData);
        } catch (error) {
            console.error("Error submitting survey:", error);
            setMessage(<><strong>Submission failed</strong><br /><br />Please try again or contact dheerajkum838@gmail.com.</>);
        } finally {
            setIsSubmitting(false);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className="mx-auto w-full max-w-2xl rounded-none bg-transparent p-4 shadow-input md:rounded-2xl md:p-8">
            <h1 className="relative z-20 mx-auto mt-6 bg-clip-text py-6 text-center text-4xl font-semibold text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                <Cover>Developer Ecosystem Survey</Cover>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-neutral-300">
                Tell us how you learn, build, and choose your tools.
            </p>

            <form className="my-8 space-y-7" onSubmit={handleSubmit}>
                <div className="grid items-stretch gap-6 md:grid-cols-2">
                    <FormSelect label="Current Role / Status" value={formData.currentRole} onValueChange={(value) => updateField("currentRole", value)} options={roles} required />
                    <FormSelect label="Years of Experience in Coding" value={formData.codingExperience} onValueChange={(value) => updateField("codingExperience", value)} options={experienceOptions} required />
                    <FormSelect label="Primary Domain / Area of Focus" value={formData.primaryDomain} onValueChange={(value) => updateField("primaryDomain", value)} options={domains} required />
                    <FormSelect label="Primary Language Used Daily" value={formData.primaryLanguage} onValueChange={(value) => updateField("primaryLanguage", value)} options={languages} required />
                    <FormSelect label="Favorite Programming Language" value={formData.favoriteLanguage} onValueChange={(value) => updateField("favoriteLanguage", value)} options={languages} required />
                    <FormSelect label="Language You Want to Learn Next" value={formData.nextLanguage} onValueChange={(value) => updateField("nextLanguage", value)} options={nextLanguages} required />
                    <FormSelect label="Primary Factor for Choosing a Language" value={formData.languageChoiceFactor} onValueChange={(value) => updateField("languageChoiceFactor", value)} options={choiceFactors} required />
                    <FormSelect label="Preferred Code Editor / IDE" value={formData.preferredEditor} onValueChange={(value) => updateField("preferredEditor", value)} options={editors} required />
                </div>

                <fieldset>
                    <legend className="mb-3 text-sm font-medium text-white">Secondary / Other Languages Frequently Used</legend>
                    <div className="grid grid-cols-2 gap-3 rounded-lg border border-zinc-700 bg-zinc-950/70 p-4 sm:grid-cols-3">
                        {languages.map(({ label, value }) => (
                            <CheckboxOption key={value} label={label} checked={formData.secondaryLanguages.includes(value)} onChange={() => toggleSecondaryLanguage(value)} />
                        ))}
                    </div>
                </fieldset>

                <div className="grid gap-6 md:grid-cols-2">
                    <FormSelect label="Most Frustrating / Least Liked Language" value={formData.frustratingLanguage} onValueChange={(value) => updateField("frustratingLanguage", value)} options={languages} required />
                    <Field label="Why do you find it frustrating?" required>
                        <Input type="text" placeholder="Share a short reason" value={formData.frustratingReason} onChange={(event) => updateField("frustratingReason", event.target.value)} required />
                    </Field>
                </div>

                <Field label="Favorite Frameworks / Tools / Stacks" required>
                    <Input type="text" placeholder="React, Next.js, Django, Spring Boot..." value={formData.favoriteTools} onChange={(event) => updateField("favoriteTools", event.target.value)} required />
                </Field>

                <fieldset>
                    <legend className="mb-3 text-sm font-medium text-white">How much have AI tools affected how you choose or write code? <span className="text-red-500">*</span></legend>
                    <div className="grid grid-cols-5 gap-2 rounded-md border border-zinc-700 bg-zinc-900/60 p-3">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className={cn("flex cursor-pointer items-center justify-center rounded-md border border-transparent p-3 text-sm transition-colors focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400", formData.aiImpact === String(rating) ? "bg-cyan-500/20 text-cyan-300" : "text-neutral-300 hover:bg-zinc-800")}>
                                <input className="sr-only" type="radio" name="aiImpact" value={rating} checked={formData.aiImpact === String(rating)} onChange={(event) => updateField("aiImpact", event.target.value)} required />
                                {rating}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <button disabled={isSubmitting || !isFormValid()} className={cn("relative block h-11 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]", isFormValid() ? "bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900" : "cursor-not-allowed bg-gray-700")} type="submit">
                    {isSubmitting ? "Submitting..." : "Submit Survey"}
                    <BottomGradient />
                </button>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
                <div className="flex justify-between">
                    <a href="https://github.com/Dheerajkhatri69" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-300 hover:text-white"><IconBrandGithub size={20} /> GitHub</a>
                    <a href="https://www.instagram.com/dheerajxkhatri69/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neutral-300 hover:text-white"><IconBrandInstagram size={20} /> Instagram</a>
                </div>
            </form>

            {isDialogOpen && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setIsDialogOpen(false)}>
                <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-neutral-200 shadow-xl" onClick={(event) => event.stopPropagation()}>
                    <h2 className="mb-3 text-lg font-semibold text-white">Survey Status</h2>
                    <div className="text-sm leading-6">{message}</div>
                    <button className="mt-6 rounded-md bg-white px-4 py-2 text-sm font-medium text-black" onClick={() => setIsDialogOpen(false)}>Close</button>
                </div>
            </div>}
        </div>
    );
}

const selectClassName = "h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400";

function FormSelect({ label, value, onValueChange, options, required }) {
    return <Field label={label} required={required}>
        <Select value={value} onValueChange={onValueChange} required={required}>
            <SelectTrigger className="border-zinc-700 bg-zinc-900 text-white focus:ring-cyan-400"><SelectValue placeholder="Select an option" /></SelectTrigger>
            <SelectContent>{options.map(({ label: optionLabel, value: optionValue }) => <SelectItem key={optionValue} value={optionValue}>{optionLabel}</SelectItem>)}</SelectContent>
        </Select>
    </Field>;
}

function Field({ label, required, children }) {
    return <div className="flex h-full flex-col gap-2"><Label className="flex min-h-10 items-end text-white">{label} {required && <span className="ml-1 text-red-500">*</span>}</Label>{children}</div>;
}

function CheckboxOption({ label, checked, onChange }) {
    return <label className={cn("group flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm transition-all", checked ? "border-cyan-400/70 bg-cyan-400/10 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.12)]" : "border-zinc-800 bg-zinc-900/80 text-neutral-300 hover:border-zinc-600 hover:bg-zinc-800", "focus-within:ring-1 focus-within:ring-cyan-400")}>
        <span>{label}</span>
        <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
        <span aria-hidden="true" className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs transition-colors", checked ? "border-cyan-300 bg-cyan-400 text-zinc-950" : "border-zinc-600 bg-zinc-950 text-transparent group-hover:border-zinc-400")}>
            ✓
        </span>
    </label>;
}

const BottomGradient = () => <>
    <span className="absolute inset-x-0 -bottom-px block h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
</>;