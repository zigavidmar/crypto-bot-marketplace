"use client";
import { Button } from '@/components/ui/button';
import { Form, FormField, FormInput, FormItem, FormMessage, FormTextarea } from '@/components/ui/Form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Mail, Plus, X } from 'lucide-react';
import Image from 'next/image';
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
    subject: z
        .string({
            required_error: "Please write a subject.",
        })
        .min(0, { message: "Subject should not be empty." })
        .max(60, { message: `Subject should not exceed 60 characters.` }),
    content: z
        .string({
            required_error: "Please write a message.",
        })
        .min(0, { message: "Message should not be empty." })
        .max(5000, { message: `Message should not exceed 5000 characters.` }),

})

interface TicketFormProps {
    tenantId: string;
}

export default function TicketForm({ tenantId }: TicketFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            subject: "Testing",
            content: "Testing"
        }
    })

    const { reset } = form;

    async function handleSubmitForm(formFields: z.infer<typeof FormSchema>) {
        setIsSubmitting(true)

        var formData = new FormData();
        formData.append("tenant_id", tenantId);
        formData.append("subject", formFields.subject);
        formData.append("content", formFields.content);
        formData.append("email", "zigavidmar47@gmail.com");

        // Append each file individually to the FormData object
        if (files) {
            Array.from(files).forEach(file => {
                formData.append("files", file);
            });
        }

        try {
            axios.post("/api/tickets", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            reset()
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form className="max-w-[700px] mx-auto py-6 h-full flex flex-col justify-between gap-10" onSubmit={form.handleSubmit(handleSubmitForm)}>
                <div className="flex flex-col gap-10">
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <Label>SUBJECT</Label>
                                <FormInput placeholder="Assistance Needed with Account Access Issues.." {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="flex justify-between">MESSAGE<span>5000 character limit</span></Label>
                                <FormTextarea maxLength={5000} className="min-h-[120px]" placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible." {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-2">
                        <Label>ATTACHMENTS</Label>
                        <Label className="font-normal">Upload up to 5 screenshots that might be relevant to the issue that you&apos;re facing</Label>
                        <div className="flex items-center flex-wrap gap-2 pt-2">
                            {files.map((file, index) => (
                                <FilePreview key={index} file={file} setFiles={setFiles} />
                            ))}
                            {files.length < 5 && <FileUpload setFiles={setFiles} />}
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 flex items-center justify-end gap-2">
                    <Button variant="secondary" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        <Mail size={16} />
                        Send support ticket
                    </Button>
                </div>
            </form>
        </Form>
    )
}

function FilePreview({ file, setFiles }: { file: File, setFiles: React.Dispatch<React.SetStateAction<File[]>> }) {

    function handleRemoveFile() {
        setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file))
    }

    return (
        <div className="flex items-center gap-2 border rounded-md h-14 w-14 relative">
            <button
                type="button"
                className="absolute -top-1 -right-1 p-0.5 rounded-full bg-red-500 z-10"
                title="Remove file"
                onClick={handleRemoveFile}
            >
                <X size={12} className="text-white" />
            </button>
            <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                objectFit="cover"
                layout="fill"
                className="rounded-md"
                objectPosition="center"
            />
        </div>
    )
}

function FileUpload({ setFiles }: { setFiles: React.Dispatch<React.SetStateAction<File[]>> }) {

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setFiles((prevFiles) => {
            if ((prevFiles.length + files.length) > 5) {
                const remainingFiles = 5 - prevFiles.length;
                return [...prevFiles, ...files.slice(0, remainingFiles)];
            }
            return [...prevFiles, ...files];
        });
    }

    return (
        <Fragment>
            <label
                htmlFor="fileUpload"
                className="flex items-center justify-center cursor-pointer border h-14 w-14 rounded-md"
            >
                <Plus size={16} />
            </label>
            <input
                type="file"
                multiple
                max={5}
                id="fileUpload"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
            />
        </Fragment>
    )
}