export interface GenerateArticleResponse {
    generation_id: string;
}
export interface GenerationStatusResponse {
    generation_id: string;
    generation_status: string;
    output_location: string | null;
}
export declare class AiceApi {
    private clientId;
    private clientSecret;
    private accessToken;
    private accessTokenExpiration;
    constructor(clientId: string, clientSecret: string);
    generateArticle(title: string, learningObjectives: string, learningGoal: string, length: number, vocabularyList: string[]): Promise<GenerateArticleResponse>;
    generationStatus(generationId: string): Promise<GenerationStatusResponse>;
    private callApi;
    private auth;
    private isTokenExpired;
}
