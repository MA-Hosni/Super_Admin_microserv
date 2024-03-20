import {connect} from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import UserClient from "@/models/clientUserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {logo, companyName, industry, companyAnnivesary, companyAddress, companyCity, companyZipCode, companyCountry, pricingPlan, firstName, lastName, email, password, phoneNumber, cin, role,} = reqBody

        console.log(reqBody);

        //check if user already exists

        const user = await UserClient.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new company
        const newCompany = new Company({
            logo,
            companyName,
            industry,
            email,
            phoneNumber,
            companyAnnivesary,
            companyAddress,
            companyCity,
            companyZipCode,
            companyCountry,
            pricingPlan,
        });

        // Save the new company to the database
        const savedCompany = await newCompany.save();

        // Create a new user associated with the company
        const newUser = new UserClient({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            cin,
            role,
            company: savedCompany._id, // Associate the user with the newly created company
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedCompany,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}