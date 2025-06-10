/// <reference types="react" />
interface GeneratorPaneProps {
    lessonData: Map<string, any>;
    clientId: string | null;
    clientSecret: string | null;
    awsAccessKeyId: string | null;
    awsSecretAccessKey: string | null;
}
export interface EngineParameters {
    title: string;
    learningObjective: string;
    learningGoal: string;
    targetWordCount: number;
    vocabularyWords: string[];
}
export default function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey }: GeneratorPaneProps): JSX.Element;
export {};
