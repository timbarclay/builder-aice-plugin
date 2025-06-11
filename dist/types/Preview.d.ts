/// <reference types="react" />
interface PreviewProps {
    content?: {
        body: string;
        questions: Array<{
            question: string;
            answer: string;
        }>;
    };
    onCreateResource?: () => void;
    isCreatingResource?: boolean;
    createdResourceId?: string | null;
}
export default function Preview({ content, onCreateResource, isCreatingResource, createdResourceId }: PreviewProps): JSX.Element;
export {};
