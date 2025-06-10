/// <reference types="react" />
import { ApplicationContext } from './interfaces/application-context';
interface GeneratorPaneProps {
    lessonData: Map<string, any>;
    clientId: string | null;
    clientSecret: string | null;
    awsAccessKeyId: string | null;
    awsSecretAccessKey: string | null;
    context: ApplicationContext;
}
export interface EngineParameters {
    title: string;
    learningObjective: string;
    learningGoal: string;
    targetWordCount: number;
    vocabularyWords: string[];
}
export default function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey, context }: GeneratorPaneProps): JSX.Element;
export {};
