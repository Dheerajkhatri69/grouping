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
        FullName: "",
        FatherName: "",
        CNIC: "",
        Gender: "",
        DateOfBirth: "",
        DomicileCity: "",
        Department: "",
        EmailAddress: "",
        MobileNumber: "",
        RegistrationNo: "",
        DegreeTitle: "",
        SemesterNo: "",
        LastSemesterGPA: "",
        CGPA: ""
    };

    // State to track form inputs and number of members
    const [formData, setFormData] = useState(initialFormData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState(0);  // State to track selected number of members


    const handleSelectChange = (value) => {
        setSelectedMembers(parseInt(value));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            const response = await fetch('https://sheetdb.io/api/v1/48w7ohbmsb772', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        {
                            "FullName": formData.FullName,
                            "FatherName": formData.FatherName,
                            "CNIC": formData.CNIC,
                            "Gender": formData.Gender,
                            "DateOfBirth": formData.DateOfBirth ? new Date(formData.DateOfBirth).toLocaleDateString('en-GB') : "",
                            "DomicileCity": formData.DomicileCity,
                            "Department": formData.Department,
                            "EmailAddress": formData.EmailAddress,
                            "MobileNumber": formData.MobileNumber,
                            "RegistrationNo": formData.RegistrationNo,
                            "DegreeTitle": formData.DegreeTitle,
                            "SemesterNo": formData.SemesterNo,
                            "LastSemesterGPA": formData.LastSemesterGPA,
                            "CGPA": formData.CGPA
                        }
                    ]
                })
            })
            if (response.ok) {
                setMessage(
                    <>
                        <strong>Registration Submitted Successfully</strong><br /><br />
                        <strong>Name:</strong> {formData.FullName}<br />
                        <strong>Father&apos;s Name:</strong> {formData.FatherName}<br />
                        <strong>CNIC:</strong> {formData.CNIC}<br />
                        <strong>Gender:</strong> {formData.Gender}<br />
                        <strong>Date of Birth:</strong> {formData.DateOfBirth}<br />
                        <strong>Domicile City:</strong> {formData.DomicileCity}<br />
                        <strong>Department:</strong> {formData.Department}<br />
                        <strong>Email:</strong> {formData.EmailAddress}<br />
                        <strong>Mobile:</strong> {formData.MobileNumber}<br />
                        <strong>Registration No:</strong> {formData.RegistrationNo}<br />
                        <strong>Degree Title:</strong> {formData.DegreeTitle}<br />
                        <strong>Semester No:</strong> {formData.SemesterNo}<br />
                        <strong>Last Semester GPA:</strong> {formData.LastSemesterGPA}<br />
                        <strong>CGPA:</strong> {formData.CGPA}
                    </>
                );
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
                <Cover>National Skills Competency Test</Cover>
            </h1>
            <p className="text-center text-sm max-w-sm mt-2 text-neutral-300">
                Please fill in your complete information below
            </p>

            {/* <Link href="/upload" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Join DBMS ClassRoom</Link> */}

            <form className="my-8" onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="FullName" className="text-white">Full Name</Label>
                        <Input
                            type="text"
                            name="FullName"
                            placeholder="Enter your full name"
                            className="text-white"
                            value={formData.FullName}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Father's Name */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="FatherName" className="text-white">Father&apos;s Name</Label>
                        <Input
                            type="text"
                            name="FatherName"
                            placeholder="Enter father's name"
                            className="text-white"
                            value={formData.FatherName}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* CNIC */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="CNIC" className="text-white">CNIC</Label>
                        <Input
                            type="text"
                            name="CNIC"
                            placeholder="Enter CNIC number"
                            className="text-white"
                            value={formData.CNIC}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Gender and Date of Birth */}
                <div className="flex flex-row space-y-0 space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="Gender" className="text-white">Gender</Label>
                        <select
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleInputChange}
                            className="px-3 py-2 w-full rounded-md bg-zinc-800 text-white border border-zinc-700"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="DateOfBirth" className="text-white">Date of Birth</Label>
                        <Input
                            type="date"
                            name="DateOfBirth"
                            className="text-white"
                            value={formData.DateOfBirth}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Domicile City and Department */}
                <div className="flex flex-row space-y-0 space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="DomicileCity" className="text-white">Domicile City</Label>
                        <Input
                            type="text"
                            name="DomicileCity"
                            placeholder="Enter domicile city"
                            className="text-white"
                            value={formData.DomicileCity}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="Department" className="text-white">Department</Label>
                        <Input
                            type="text"
                            name="Department"
                            placeholder="Enter department"
                            className="text-white"
                            value={formData.Department}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Email Address and Mobile Number */}
                <div className="flex flex-row space-y-0 space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="EmailAddress" className="text-white">Email Address</Label>
                        <Input
                            type="email"
                            name="EmailAddress"
                            placeholder="Enter email address"
                            className="text-white"
                            value={formData.EmailAddress}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="MobileNumber" className="text-white">Mobile Number</Label>
                        <Input
                            type="tel"
                            name="MobileNumber"
                            placeholder="Enter mobile number"
                            className="text-white"
                            value={formData.MobileNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Registration Number */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="RegistrationNo" className="text-white">Registration No</Label>
                        <Input
                            type="text"
                            name="RegistrationNo"
                            placeholder="Enter registration number"
                            className="text-white"
                            value={formData.RegistrationNo}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Degree Title */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="DegreeTitle" className="text-white">Degree Title</Label>
                        <Input
                            type="text"
                            name="DegreeTitle"
                            placeholder="Enter degree title"
                            className="text-white"
                            value={formData.DegreeTitle}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* Semester Number and Last Semester GPA */}
                <div className="flex flex-row space-y-0 space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="SemesterNo" className="text-white">Semester No</Label>
                        <Input
                            type="number"
                            name="SemesterNo"
                            placeholder="Enter semester number"
                            className="text-white"
                            value={formData.SemesterNo}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="LastSemesterGPA" className="text-white">Last Semester GPA</Label>
                        <Input
                            type="number"
                            step="0.01"
                            name="LastSemesterGPA"
                            placeholder="0.00"
                            className="text-white"
                            value={formData.LastSemesterGPA}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>

                {/* CGPA */}
                <div className="mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="CGPA" className="text-white">CGPA</Label>
                        <Input
                            type="number"
                            step="0.01"
                            name="CGPA"
                            placeholder="0.00"
                            className="text-white"
                            value={formData.CGPA}
                            onChange={handleInputChange}
                            required
                        />
                    </LabelInputContainer>
                </div>
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