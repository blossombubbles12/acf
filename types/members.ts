export type MemberStatus = 'active' | 'inactive' | 'pending';

export interface Member {
    id: number;
    full_name: string;
    email: string | null;
    phone: string | null;
    occupation: string | null;
    industry: string | null;
    location: string | null;
    cohort: string | null;
    status: MemberStatus;
    photo_url: string | null;
    is_visible: boolean;
    biography: string | null;
    is_executive: boolean;
    executive_role: string | null;
    created_at: string;
}

export interface RegisterMemberInput {
    full_name: string;
    email: string;
    phone?: string;
    occupation?: string;
    industry?: string;
    location?: string;
    cohort?: string;
    biography?: string;
    photo_url?: string;
}
