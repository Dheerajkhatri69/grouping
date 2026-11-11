"use client";

import React, { useState } from "react";
import { IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react";
import { Cover } from "./ui/cover";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import students from "@/data/students.json";

const SHEET_URL = "https://sheetdb.io/api/v1/48w7ohbmsb772";
const GROUP_SIZE = 4;

const emptyMembers = () => Array.from({ length: GROUP_SIZE }, () => ({ query: "", student: null }));

export function SignupFormDemo() {
    const [members, setMembers] = useState(emptyMembers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateMember = (index, value) =>
        setMembers((current) => current.map((m, i) => (i === index ? value : m)));

    const selectedIds = members.filter((m) => m.student).map((m) => m.student.id);
    const hasDuplicates = new Set(selectedIds).size !== selectedIds.length;
    const isFormValid = selectedIds.length === GROUP_SIZE && !hasDuplicates;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) return;

        const row = {};
        members.forEach(({ student }, i) => {
            const n = String(i + 1).padStart(2, "0");
            row[`id${n}`] = student.id;
            row[`name${n}`] = student.name;
            row[`couse_code${n}`] = student.courseCode;
            row[`class_no${n}`] = student.classNo;
        });

        setIsSubmitting(true);
        try {
            const response = await fetch(SHEET_URL, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ data: [row] }),
            });

            if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
            setMessage(<><strong>Group submitted successfully</strong><br /><br />Your group of {GROUP_SIZE} members has been saved.</>);
            setMembers(emptyMembers());
        } catch (error) {
            console.error("Error submitting group:", error);
            setMessage(<><strong>Submission failed</strong><br /><br />Please try again or contact dheerajkum838@gmail.com.</>);
        } finally {
            setIsSubmitting(false);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className="mx-auto w-full max-w-96 rounded-none bg-transparent p-4 shadow-input md:rounded-2xl md:p-8">
            <h1 className="relative z-20 mx-auto mt-6 bg-clip-text py-6 text-center text-2xl font-semibold text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                <Cover>Ethics Course Group</Cover>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-neutral-300">
                Create a group for the assignment and project. A group must have exactly {GROUP_SIZE} members. Enter your own ID as Member 01, then the IDs of your other 3 members.
            </p>

            <form className="mx-auto my-8 max-w-lg space-y-6" onSubmit={handleSubmit}>
                {members.map((member, index) => (
                    <MemberField
                        key={index}
                        index={index}
                        member={member}
                        takenIds={selectedIds}
                        onChange={(value) => updateMember(index, value)}
                    />
                ))}

                {hasDuplicates && <p className="text-sm text-red-500">The same student is selected more than once.</p>}
                <p className="text-center text-xs text-neutral-400">{selectedIds.length}/{GROUP_SIZE} members selected</p>

                <button disabled={isSubmitting || !isFormValid} className={`block h-11 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] ${isFormValid ? "bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900" : "cursor-not-allowed bg-gray-700"}`} type="submit">
                    {isSubmitting ? "Submitting..." : "Submit Group"}
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

function MemberField({ index, member, takenIds, onChange }) {
    const [open, setOpen] = useState(false);
    const { query, student } = member;

    const q = query.trim().toLowerCase();
    const suggestions = students
        .filter((s) => !takenIds.includes(s.id))
        .filter((s) => !q || s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
        .slice(0, 8);

    const label = `Member ${String(index + 1).padStart(2, "0")}${index === 0 ? " (You)" : ""}`;

    return (
        <div className="relative flex flex-col gap-2">
            <Label className="text-white">{label} <span className="ml-1 text-red-500">*</span></Label>
            <Input
                type="text"
                autoComplete="off"
                placeholder="Type student ID"
                value={query}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                onChange={(event) => {
                    // Typing again clears the previous selection; a student must be picked from the list.
                    onChange({ query: event.target.value, student: null });
                    setOpen(true);
                }}
            />

            {open && !student && (
                <ul className="absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-auto rounded-md border border-zinc-700 bg-zinc-900 text-sm text-neutral-200 shadow-xl">
                    {suggestions.length === 0 && <li className="px-3 py-2 text-neutral-400">No student found with this ID</li>}
                    {suggestions.map((s) => (
                        <li
                            key={s.id}
                            className="cursor-pointer px-3 py-2 hover:bg-zinc-800"
                            onMouseDown={(event) => {
                                event.preventDefault();
                                onChange({ query: s.id, student: s });
                                setOpen(false);
                            }}
                        >
                            <span className="font-medium text-white">{s.id}</span> — {s.name}
                        </li>
                    ))}
                </ul>
            )}

            {student && (
                <div className="rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-xs leading-5 text-neutral-300">
                    <div><span className="text-neutral-500">Name:</span> {student.name}</div>
                    <div><span className="text-neutral-500">Course Code:</span> {student.courseCode}</div>
                    <div><span className="text-neutral-500">Class No:</span> {student.classNo}</div>
                </div>
            )}
        </div>
    );
}
