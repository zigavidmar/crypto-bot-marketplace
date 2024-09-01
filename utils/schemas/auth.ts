import { z } from "zod"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const SignInWithEmailSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email."
    }).min(1, {
        message: "Please enter your email."
    }).max(100, {
        message: "Email is too long."
    }).refine(value => emailRegex.test(value), {
        message: "Please enter a valid email."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    }).max(100, {
        message: "Password is too long."
    }).refine(value => !value.includes(" "), {
        message: "Password cannot contain spaces."
    })
})

export {
    SignInWithEmailSchema
}