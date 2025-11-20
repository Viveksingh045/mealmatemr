import { z } from "zod";
import { indianStatesAndUTs } from "@/data/indian_states"
import { country } from "@/data/country"

export const signUpSchema = 
z.object({
    name: z.string()
        .min(4, "Name must be at least 4 characters")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
    email: z.email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Password must not exceed 15 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    cnfpassword : z.string(),
    role: z.enum(["MERCHANT", "CUSTOMER","select"]),
    addressline1 : z.string()
        .min(8, "Password must be at least 8 characters"),
    addressline2: z.string().optional(),
    pincode: z.string().min(6).max(6),
    city : z.string(),
    state: z.enum(indianStatesAndUTs),
    country: z.enum(country)
})
.refine((data) => data.password === data.cnfpassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type SignUpInput = z.infer<typeof signUpSchema>;

export const VerifyCodeSchema = z.object({
  securityCode: z.string()

});

export type VerifyCodeInput = z.infer<typeof VerifyCodeSchema>

export const LinkPrimarySchema = z.object({
  email : z.string().email("Invalid Email Address"),
  inviteCode :z.string().length(20,"Invalid Invite Code")
});


export type LinkPrimaryInput = z.infer<typeof LinkPrimarySchema>;