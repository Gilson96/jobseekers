import type { Dispatch, SetStateAction } from "react"

export type Company = {
    company_id?: number
    company_name?: string,
    email?: string,
    password?: string,
    number?: string,
    address?: string,
    role?: string,
    jobs_posted?: [
        {
            title: string,
            job_id: number,
            location: string
        }
    ]
}

export type Skills = {
    skills_id?: number
    skills_name?: string
}

export type Job = {
    job_id?: number | string,
    title?: string,
    location?: string,
    company_name?: string
    pay?: string,
    type?: string,
    company_id?: number,
    description?: {
        about_us: string,
        job_details: string,
        requirements: string,
        shift_pattern: string
    },
    skills?: [{ skills_id: number, skills_job_id: number, skills_name: string }]
}

export type JobCardProps = {
    job?: Job;
    job_id?: number
    isFetching?: boolean;
    setJob_id: Dispatch<SetStateAction<number>>;
    guestUser?: User;
    user?: { user: User };
    userIsFetching?: boolean;
}

export type JobSearch = {
    isSearchingJob: boolean;
    searchedJob?: Job[];
    searchFetching: boolean;
    searchLoading: boolean;
    user?: { user: User }
    guestUser: User
    userIsFetching: boolean
    userIsLoading: boolean
}

export type User = {
    id?: number
    user_id?: number
    name?: string,
    avatar_img?: string | null,
    email?: string,
    password?: string,
    number?: string,
    address?: string,
    cv?: string
    role?: string
    token?: string
    skills?: Skills_user[]
    jobs_applied?: Job[]
}

export type ApplicationProps = {
    step: number;
    setUserDetails: Dispatch<
        SetStateAction<{
            name?: string
            email?: string;
            number?: string;
            address?: string;
            cv?: File;
            jobs_applied?: Job[]
        }>
    >;
    userDetails?: {
        name?: string | undefined
        email?: string | undefined;
        number?: string | undefined;
        address?: string | undefined;
        cv?: File | undefined;
        jobs_applied?: Job[] | undefined
    };
    setStep: Dispatch<SetStateAction<number>>;
    job?: Job;
    user?: { user: User };
    isFetching: boolean,
    isLoading: boolean
};

export type Application = {
    application_id?: number,
    job_id?: number,
    user_id?: number
}

export type Skills_user = {
    skills_user_id?: number,
    skills_id?: number
    user_id?: number,
    skills_name?: string
}

export type Skills_job = {
    skills_job_id?: number,
    skills_id?: number
    job_id?: number,
    skills_name?: string
}

export type Application_user = {
    application_user_id?: number,
    application_id?: number,
    job_id?: number | string,
    user_id?: number
    title?: string,
    location?: string,
    company_name?: string
}

export type Application_job = {
    application_job_id?: number,
    application_id?: number,
    job_id?: number
    user_id?: number
    name?: string,
    email?: string,
    number?: string,
    address?: string,
    cv?: string,
    guest_name?: string,
    guest_email?: string
    guest_cv?: string
}

export type Saved_job = {
    saved_job_id?: number,
    user_id?: number,
    job_id?: number,
    saved_jobs?: Job[]
}
