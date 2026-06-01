"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    IconBrandGithub,
    IconBrandInstagram,
} from "@tabler/icons-react";
import { Cover } from "./ui/cover";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

export function SignupFormDemo() {
    // Initial form state
    const initialFormData = {
        TopicName: "",
        ID1: "",
        StudentName1: "",
        ID2: "",
        StudentName2: "",
        ID3: "",
        StudentName3: "",
        ID4: "",
        StudentName4: "",
    };

    // State to track form inputs
    const [formData, setFormData] = useState(initialFormData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    // Function to count filled members
    const countFilledMembers = () => {
        let count = 0;
        if (formData.ID1 && formData.StudentName1) count++;
        if (formData.ID2 && formData.StudentName2) count++;
        if (formData.ID3 && formData.StudentName3) count++;
        if (formData.ID4 && formData.StudentName4) count++;
        return count;
    };

    // Function to validate form
    const isFormValid = () => {
        const filledMembers = countFilledMembers();
        return formData.TopicName.trim() !== "" && filledMembers === 3;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submission
        if (!isFormValid()) {
            setMessage(
                <>
                    <strong>Invalid Group Size</strong><br /><br />
                    Your group must have exactly 3 members.<br />
                    Current members: {countFilledMembers()}
                </>
            );
            setIsDialogOpen(true);
            return;
        }

        setIsDisabled(true);
        try {
            // Build data with only filled members
            const dataToSubmit = {
                TopicName: formData.TopicName,
                ID1: formData.ID1,
                StudentName1: formData.StudentName1,
                ID2: formData.ID2,
                StudentName2: formData.StudentName2,
                ID3: formData.ID3 || "",
                StudentName3: formData.StudentName3 || "",
                ID4: formData.ID4 || "",
                StudentName4: formData.StudentName4 || "",
            };

            const response = await fetch('https://sheetdb.io/api/v1/48w7ohbmsb772', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [dataToSubmit]
                })
            })

            if (response.ok) {
                // 🆕 Build folder name: Name1(ID1)_Name2(ID2)_Name3(ID3)
                const folderName = [
                    formData.StudentName1 && formData.ID1 ? `${formData.StudentName1}(${formData.ID1})` : null,
                    formData.StudentName2 && formData.ID2 ? `${formData.StudentName2}(${formData.ID2})` : null,
                    formData.StudentName3 && formData.ID3 ? `${formData.StudentName3}(${formData.ID3})` : null,
                ]
                    .filter(Boolean)
                    .join("_");

                // 🆕 Create OneDrive folder
                try {
                    await fetch("/api/create-folder", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ folderName }),
                    });
                } catch (folderErr) {
                    console.error("Folder creation failed:", folderErr);
                    // Don't block success — sheet submission already worked
                }

                // Build dynamic success message based on filled members
                let successMsg = (
                    <>
                        <strong>Registration Submitted Successfully</strong><br /><br />
                        <strong>Project Name:</strong> {formData.TopicName}<br />
                        <strong>Member 01:</strong> {formData.StudentName1} (ID: {formData.ID1})<br />
                        <strong>Member 02:</strong> {formData.StudentName2} (ID: {formData.ID2})<br />
                        {formData.ID3 && formData.StudentName3 && (
                            <><strong>Member 03:</strong> {formData.StudentName3} (ID: {formData.ID3})<br /></>
                        )}

                        <br />
                        ⚠️ <strong>IMPORTANT:</strong> Open the folder below and find your folder named <strong style={{ color: "#fbbf24" }}>📂 {folderName}</strong> then upload your PPT and Video inside it.<br /><br />

                        <a
                            href="https://smiupk-my.sharepoint.com/:f:/g/personal/csc23s010_stu_smiu_edu_pk/IgBy5V2BJ6iBRbd9yMi8nVqBASejmWXkx5tAxqdGjvsKsvE?e=jAfZLd"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#60a5fa", textDecoration: "underline" }}
                        >
                            🔗 Open PST_Project Folder
                        </a>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText("https://smiupk-my.sharepoint.com/:f:/g/personal/csc23s010_stu_smiu_edu_pk/IgBy5V2BJ6iBRbd9yMi8nVqBASejmWXkx5tAxqdGjvsKsvE?e=jAfZLd");
                                alert("Link copied!");
                            }}
                            style={{ marginLeft: "8px", background: "none", border: "none", cursor: "pointer", color: "#a3a3a3", fontSize: "13px" }}
                        >
                            📋 Copy Link
                        </button>

                        <br /><br />
                        <span style={{ color: "#a3a3a3", fontSize: "12px" }}>
                            💡 Not ready? Copy the link and upload your files later.
                        </span>
                    </>
                );
                setMessage(successMsg);
            } else {
                setMessage(
                    <>Error
                        <br />
                        <>{response.status}:(Bad Request)</><br />
                        <>contect: <>dheerajkum838@gmail.com</></>
                    </>
                )
            }
            // Reset form data and re-enable the submit button
            setFormData(initialFormData);
            setIsDialogOpen(true);
            setIsDisabled(false);


        } catch (error) {
            console.error("Error occurred while posting the score:", error);
            setMessage(
                <>Error
                    <br />
                    <>An error occurred while posting the score. Please try again.</>
                </>
            )
            setIsDialogOpen(true);
            setIsDisabled(false);
            return {
                success: false,
                message: "An error occurred while posting the score. Please try again.",
            };
        }

    }
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle the selection of group members

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent">
            <h1 className="text-4xl font-semibold mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                <Cover>Pakistan Studies Project</Cover>
            </h1>
            <p className="text-center text-sm max-w-sm mt-2 text-neutral-300">
                Register Your Group (3 Members)
            </p>

            {/* <Link href="/upload" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Join DBMS ClassRoom</Link> */}

            <form className="my-8" onSubmit={handleSubmit}>

                {/* Project Name */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="TopicName" className="text-white">Project Name <span className="text-red-500">*</span></Label>
                        <Input
                            type="text"
                            name="TopicName"
                            placeholder="Enter project name"
                            className="text-white"
                            value={formData.TopicName}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Member 1 */}
                <div className="mb-4">
                    <h3 className="text-white font-semibold mb-3">Member 1 <span className="text-red-500">*</span></h3>
                    <div className="flex flex-row space-y-0 space-x-2 mb-3">
                        <LabelInputContainer>
                            <Label htmlFor="ID1" className="text-white">Student ID</Label>
                            <Input
                                type="text"
                                name="ID1"
                                placeholder="Enter student ID"
                                className="text-white"
                                value={formData.ID1}
                                onChange={handleInputChange}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="StudentName1" className="text-white">Student Name</Label>
                            <Input
                                type="text"
                                name="StudentName1"
                                placeholder="Enter student name"
                                className="text-white"
                                value={formData.StudentName1}
                                onChange={handleInputChange}
                                required
                            />
                        </LabelInputContainer>
                    </div>
                </div>

                {/* Member 2 */}
                <div className="mb-4">
                    <h3 className="text-white font-semibold mb-3">Member 2 <span className="text-red-500">*</span></h3>
                    <div className="flex flex-row space-y-0 space-x-2">
                        <LabelInputContainer>
                            <Label htmlFor="ID2" className="text-white">Student ID</Label>
                            <Input
                                type="text"
                                name="ID2"
                                placeholder="Enter student ID"
                                className="text-white"
                                value={formData.ID2}
                                onChange={handleInputChange}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="StudentName2" className="text-white">Student Name</Label>
                            <Input
                                type="text"
                                name="StudentName2"
                                placeholder="Enter student name"
                                className="text-white"
                                value={formData.StudentName2}
                                onChange={handleInputChange}
                                required
                            />
                        </LabelInputContainer>
                    </div>
                </div>

                {/* Member 3 */}
                <div className="mb-4">
                    <h3 className="text-white font-semibold mb-3">Member 3 <span className="text-red-500">*</span></h3>
                    <div className="flex flex-row space-y-0 space-x-2 mb-3">
                        <LabelInputContainer>
                            <Label htmlFor="ID3" className="text-white">Student ID</Label>
                            <Input
                                type="text"
                                name="ID3"
                                placeholder="Enter student ID"
                                className="text-white"
                                value={formData.ID3}
                                onChange={handleInputChange}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="StudentName3" className="text-white">Student Name</Label>
                            <Input
                                type="text"
                                name="StudentName3"
                                placeholder="Enter student name"
                                className="text-white"
                                value={formData.StudentName3}
                                onChange={handleInputChange}
                                required
                            />
                        </LabelInputContainer>
                    </div>
                </div>



                {/* Member Count Display */}
                <div className="mb-4 p-3 bg-zinc-800 rounded-md border border-zinc-700">
                    <p className="text-white text-sm">
                        Members: <span className={isFormValid() ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                            {countFilledMembers()}/3
                        </span>
                        {!isFormValid() && <span className="text-red-400 text-xs ml-2">(Exactly 3 members required)</span>}
                    </p>
                </div>
                <button
                    disabled={isDisabled || !isFormValid()}
                    className={`relative group/btn block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${isFormValid()
                        ? "bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800"
                        : "bg-gray-600 dark:bg-gray-700 cursor-not-allowed"
                        }`}
                    type="submit"
                >
                    {isDisabled ? "Processing..." : <>Submit &rarr;</>}
                    <BottomGradient />
                </button>

                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent className="rounded-md">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Your Detail</AlertDialogTitle>
                            <AlertDialogDescription>
                                {message}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex justify-between">
                    <a href="https://github.com/Dheerajkhatri69" target="_black">
                        <Cover className="flex justify-start line-through items-center gap-1 w-full">
                            <IconBrandGithub size={20} className="text-neutral-300" />
                            GitHub
                        </Cover>
                    </a>
                    <a href="https://www.instagram.com/dheerajxkhatri69/" target="_black">
                        <Cover className="flex justify-start line-through items-center gap-1">
                            <IconBrandInstagram size={20} className="text-neutral-300" />
                            Instagram
                        </Cover>
                    </a>


                </div>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};