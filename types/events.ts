export type EventStatus = 'draft' | 'published' | 'archived';

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time?: string;
    location?: string;
    image_url?: string;
    status: EventStatus;
    author_id?: number;
    created_at: string;
}

export interface CreateEventInput {
    title: string;
    description: string;
    date: string;
    time?: string;
    location?: string;
    image_url?: string;
    status?: EventStatus;
}
