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
        id1: "",
        name1: "",
        id2: "",
        name2: "",
        id3: "",
        name3: "",
        id4: "",
        name4: "",
    };

    // State to track form inputs and number of members
    const [formData, setFormData] = useState(initialFormData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState(2);  // State to track selected number of members

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDisabled(true);
        // Log form data to the console
        console.log("Form Data:", formData);

        // Submit the data via axios
        axios.post('https://sheet.best/api/sheets/500e496e-fb8f-466a-9cc0-99ebfe0c07e5', {
            ID1: formData.id1, Member1: formData.name1,
            ID2: formData.id2, Member2: formData.name2,
            ID3: formData.id3, Member3: formData.name3,
            ID4: formData.id4, Member4: formData.name4
        }).then((response) => {
            console.log(response);

            setMessage(
                <>
                    {formData.name1} ({formData.id1})<br />
                    {formData.name2} ({formData.id2})<br />
                    {selectedMembers >= 3 && (
                        <>
                            {formData.name3} ({formData.id3})<br />
                        </>
                    )}
                    {selectedMembers === 4 && (
                        <>
                            {formData.name4} ({formData.id4})<br />
                        </>
                    )}
                </>
            );

            // Reset form data and re-enable the submit button
            setFormData(initialFormData);
            setIsDialogOpen(true);
            setIsDisabled(false);
        });
    };


    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle the selection of group members
    const handleSelectChange = (value) => {
        setSelectedMembers(parseInt(value));
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent">
            <h1 className="text-4xl font-semibold mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                <Cover>Grouping</Cover>
            </h1>
            <p className="text-center text-sm max-w-sm mt-2 text-neutral-300">
                Here submit your group members ID and NAME for project/presentation for
                <span className="font-extrabold"> DBMS</span>
                <br />
                <span className="font-mono">Batch:</span>
                <span className="font-extrabold">Spring-23</span>
            </p>

            <Link href="/upload" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Join DBMS ClassRoom</Link>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-row space-y-0 justify-between space-x-2 mb-4">
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-[180px] text-white">
                            <SelectValue placeholder="2" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                {/* Render input fields conditionally based on selectedMembers */}
                <div className="flex flex-row space-y-0 space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="id1" className="text-white">ID</Label>
                        <Input
                            type="text"
                            name="id1"
                            placeholder="CSC-23S-000"
                            className="text-white"
                            value={formData.id1}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="name1" className="text-white">Full Name</Label>
                        <Input
                            type="text"
                            name="name1"
                            placeholder="XYZ"
                            className="text-white"
                            value={formData.name1}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                <div className="flex flex-row space-y-0 space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="id2" className="text-white">ID</Label>
                        <Input
                            type="text"
                            name="id2"
                            placeholder="CSC-23S-000"
                            className="text-white"
                            value={formData.id2}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="name2" className="text-white">Full Name</Label>
                        <Input
                            type="text"
                            name="name2"
                            placeholder="XYZ"
                            className="text-white"
                            value={formData.name2}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {selectedMembers >= 3 && (
                    <div className="flex flex-row space-y-0 space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="id3" className="text-white">ID</Label>
                            <Input
                                type="text"
                                name="id3"
                                placeholder="CSC-23S-000"
                                className="text-white"
                                value={formData.id3}
                                onChange={handleInputChange}
                                required={selectedMembers >= 3}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="name3" className="text-white">Full Name</Label>
                            <Input
                                type="text"
                                name="name3"
                                placeholder="XYZ"
                                className="text-white"
                                value={formData.name3}
                                onChange={handleInputChange}
                                required={selectedMembers >= 3}
                            />
                        </LabelInputContainer>
                    </div>
                )}

                {selectedMembers === 4 && (
                    <div className="flex flex-row space-y-0 space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="id4" className="text-white">ID</Label>
                            <Input
                                type="text"
                                name="id4"
                                placeholder="CSC-23S-000"
                                className="text-white"
                                value={formData.id4}
                                onChange={handleInputChange}
                                required={selectedMembers === 4}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="name4" className="text-white">Full Name</Label>
                            <Input
                                type="text"
                                name="name4"
                                placeholder="XYZ"
                                className="text-white"
                                value={formData.name4}
                                onChange={handleInputChange}
                                required={selectedMembers === 4}
                            />
                        </LabelInputContainer>
                    </div>
                )}

                <button
                    disabled={isDisabled}
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    {isDisabled ? "Processing..." : <>Submit &rarr;</>}
                    <BottomGradient />
                </button>

                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent className="rounded-md">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Your Group</AlertDialogTitle>
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
