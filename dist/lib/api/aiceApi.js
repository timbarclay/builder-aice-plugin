"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiceApi = void 0;
const AUTH_URL = 'https://ice-auth-dev.auth.us-east-1.amazoncognito.com/oauth2/token';
const AI_URL = 'https://06vso1ffs3.execute-api.us-east-1.amazonaws.com/dev';
class AiceApi {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    generateArticle(title, learningObjectives, learningGoal, length, vocabularyList) {
        return this.callApi('/generate/article', {
            title,
            learning_objectives: [learningObjectives],
            learning_goal: [learningGoal],
            word_count: length,
            vocabulary_list: vocabularyList,
            generate_images: false,
        });
    }
    generationStatus(generationId) {
        return this.callApi(`/status`, {
            generation_id: generationId,
        });
    }
    callApi(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken || this.isTokenExpired()) {
                yield this.auth();
            }
            const response = yield fetch(`${AI_URL}${path}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });
            if (response.status === 401 || response.status === 403) {
                this.accessToken = undefined;
                this.accessTokenExpiration = undefined;
            }
            return response.json();
        });
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(AUTH_URL, {
                method: 'POST',
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    scope: 'ice-m2m-resource-server-dev/read',
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const data = yield response.json();
            this.accessToken = data.access_token;
            this.accessTokenExpiration = new Date(Date.now() + data.expires_in * 1000);
        });
    }
    isTokenExpired() {
        return this.accessTokenExpiration && this.accessTokenExpiration < new Date();
    }
}
exports.AiceApi = AiceApi;
const mockStatus = {
    generation_id: 'arn:aws:states:us-east-1:373983736669:execution:ice-sfn-article-dev:66bfdb3d-c647-4cbc-9178-f0044348901c',
    generation_status: 'COMPLETED',
    submitted_at: '2025-05-20T13:54:59.648Z',
    output_location: 's3://ai-ice-generation-dev/generate/article/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-article-dev:66bfdb3d-c647-4cbc-9178-f0044348901c/output.json',
    completed_at: '2025-05-20T13:59:06.117Z',
    evaluation_data: {
        objective_metrics: [
            {
                name: 'aoa_mean',
                value: 5.387311178247733,
                within_threshold: null,
                config: {
                    name: 'aoa_mean',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
            {
                name: 'aoa_median',
                value: 5.22,
                within_threshold: null,
                config: {
                    name: 'aoa_median',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
            {
                name: 'aoa_std',
                value: 1.3763047880252888,
                within_threshold: null,
                config: {
                    name: 'aoa_std',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
            {
                name: 'flesch_score',
                value: 75.91,
                within_threshold: false,
                config: {
                    name: 'flesch_score',
                    enabled: true,
                    lower: 80,
                    higher: 100,
                },
            },
            {
                name: 'num_bullet_points',
                value: 0,
                within_threshold: null,
                config: {
                    name: 'num_bullet_points',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
            {
                name: 'num_words',
                value: 332,
                within_threshold: true,
                config: {
                    name: 'num_words',
                    enabled: true,
                    lower: 250,
                    higher: 350,
                },
            },
            {
                name: 'num_paragraphs',
                value: 7,
                within_threshold: null,
                config: {
                    name: 'num_paragraphs',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
            {
                name: 'num_characters',
                value: 1888,
                within_threshold: null,
                config: {
                    name: 'num_characters',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
            {
                name: 'num_characters_question_1',
                value: 70,
                within_threshold: true,
                config: {
                    name: 'num_characters_questions',
                    enabled: true,
                    lower: 20,
                    higher: 80,
                },
            },
            {
                name: 'num_characters_question_2',
                value: 69,
                within_threshold: true,
                config: {
                    name: 'num_characters_questions',
                    enabled: true,
                    lower: 20,
                    higher: 80,
                },
            },
            {
                name: 'num_characters_question_3',
                value: 65,
                within_threshold: true,
                config: {
                    name: 'num_characters_questions',
                    enabled: true,
                    lower: 20,
                    higher: 80,
                },
            },
            {
                name: 'num_characters_question_4',
                value: 61,
                within_threshold: true,
                config: {
                    name: 'num_characters_questions',
                    enabled: true,
                    lower: 20,
                    higher: 80,
                },
            },
            {
                name: 'num_characters_question_5',
                value: 63,
                within_threshold: true,
                config: {
                    name: 'num_characters_questions',
                    enabled: true,
                    lower: 20,
                    higher: 80,
                },
            },
            {
                name: 'words_presence_percentage',
                value: 100,
                within_threshold: true,
                config: {
                    name: 'words_presence_percentage',
                    enabled: true,
                    lower: 100,
                    higher: 100,
                },
            },
            {
                name: 'num_words_found',
                value: 5,
                within_threshold: null,
                config: {
                    name: 'num_words_found',
                    enabled: true,
                    lower: null,
                    higher: null,
                },
            },
        ],
        subjective_metrics: [
            {
                name: 'Alignment with Objective',
                value: true,
                explanation: "The article 'Who Are School Leaders?' fulfills the learning objective of 'Read an article to gain information.' The text provides clear, age-appropriate information about different school leaders (principals, teachers, counselors, nurses, and librarians) and their roles within a school. The article is structured to deliver factual content about each leader's responsibilities and how they contribute to the school environment, allowing readers to gain new information through reading.",
                passed_review: true,
                config: {
                    name: 'Alignment with Objective',
                    enabled: true,
                    prompt: 'article_alignment_with_objectives',
                    human_prompt: 'Does the article align with the learning objective?',
                    review_check: true,
                },
            },
            {
                name: 'Alignment with Learning Goal',
                value: true,
                explanation: "The article successfully fulfills the learning goal 'I can remember a school leader and how they help at school.' It clearly identifies multiple school leaders (principal, teachers, counselor, nurse, and librarian) and provides specific details about how each one helps at school. For each leader, the article explains their roles, responsibilities, and how they contribute to making the school function well. The content is presented in an age-appropriate way that would help students remember these leaders and their functions.",
                passed_review: true,
                config: {
                    name: 'Alignment with Learning Goal',
                    enabled: true,
                    prompt: 'article_alignment_with_goals',
                    human_prompt: 'Does the article match the learning goal?',
                    review_check: true,
                },
            },
            {
                name: 'Comprehension Questions Accuracy',
                value: true,
                explanation: "All five comprehension questions can be answered directly from the article content. Question 1 can be answered with 'principal' from paragraph 2. Question 2 can be answered with 'teacher' from paragraph 3. Question 3 can be answered with 'school' from paragraph 1. Question 4 can be answered with 'fair' from paragraph 2. Question 5 can be answered with 'help' which appears in paragraphs about both the counselor and nurse.",
                passed_review: true,
                config: {
                    name: 'Comprehension Questions Accuracy',
                    enabled: true,
                    prompt: 'article_comprehension_question_accuracy',
                    human_prompt: 'Can the comprehension questions be answered using the article, either directly or through inference?',
                    review_check: true,
                },
            },
            {
                name: 'Answer Accuracy',
                value: true,
                explanation: "All the provided answers can be directly found in the article text. 1) 'The principal makes sure everyone follows the rules and stays safe.' 2) 'A teacher helps students learn new things every day in class.' 3) 'School leaders are people who help make our school a good place to learn.' 4) 'When there is a problem between students, the principal helps make things fair for everyone.' 5) While not stated in exactly these words, the article clearly indicates that both the counselor ('helps when you feel sad or worried' and 'help students who need extra support') and the nurse ('helps when students don't feel well') provide help to students who need support.",
                passed_review: true,
                config: {
                    name: 'Answer Accuracy',
                    enabled: true,
                    prompt: 'article_comprehension_answer_accuracy',
                    human_prompt: 'Are the provided answers accurate?',
                    review_check: true,
                },
            },
            {
                name: 'Clarity & Directness',
                value: true,
                explanation: "The article uses clear, direct language appropriate for young readers. It explains the roles of school leaders (principal, teachers, counselor, nurse, librarian) in simple terms without unnecessary complexity. Each paragraph focuses on one type of leader with concrete examples of their responsibilities. The text maintains accuracy while using straightforward vocabulary and short sentences. Complex concepts like leadership are broken down into tangible actions that students can understand (e.g., 'The principal makes sure everyone follows the rules and stays safe'). The article avoids jargon and presents information in a logical, accessible manner.",
                passed_review: true,
                config: {
                    name: 'Clarity & Directness',
                    enabled: true,
                    prompt: 'article_clarity_and_directness',
                    human_prompt: 'Is the language used in the article clear and direct?',
                    review_check: true,
                },
            },
            {
                name: 'Figurative Language Usage',
                value: false,
                explanation: "The article 'Who Are School Leaders?' does not contain figurative language such as metaphors, similes, or idioms. The text is written in straightforward, literal language that directly explains the roles of various school leaders (principals, teachers, counselors, nurses, and librarians). The language is simple, concrete, and descriptive, making it appropriate for young readers. The author uses clear statements about what each school leader does rather than comparing them to other things (similes/metaphors) or using idiomatic expressions that might require interpretation. This literal approach enhances comprehension for the intended audience by presenting information in a direct, accessible manner.",
                passed_review: null,
                config: {
                    name: 'Figurative Language Usage',
                    enabled: true,
                    prompt: 'article_figurative_langage',
                    human_prompt: 'Does the article contain figurative language (e.g., metaphors, similes, idioms)? If so, does it enhance or hinder comprehension?',
                    review_check: false,
                },
            },
            {
                name: 'Bias & Objectivity',
                value: true,
                explanation: 'The article presents factual information about different school leadership roles without expressing personal opinions as facts or showing bias. It describes the roles and responsibilities of principals, teachers, counselors, nurses, and librarians in objective terms, focusing on their functions within the school environment. The language is straightforward and educational, appropriate for young readers, and does not advocate for any particular political, social, or ideological position. The article maintains a neutral, informative tone throughout and presents the roles of school leaders in a balanced way.',
                passed_review: true,
                config: {
                    name: 'Bias & Objectivity',
                    enabled: true,
                    prompt: 'article_bias_and_objectivity',
                    human_prompt: 'Does the article avoid biases and refrain from stating opinions as facts?',
                    review_check: true,
                },
            },
            {
                name: 'Duplicate Content',
                value: true,
                explanation: "The article 'Who Are School Leaders?' avoids unnecessary duplication of words, sentences, and ideas. Each paragraph introduces a different school leader (principal, teachers, counselor, nurse, librarian) with distinct responsibilities and contributions. While there are some repeated phrases like 'school leader' and 'help students,' these repetitions are appropriate for maintaining the article's focus and cohesion. Each section adds unique value by explaining different leadership roles within a school setting. The language is clear and appropriately simplified for young readers without redundant content.",
                passed_review: null,
                config: {
                    name: 'Duplicate Content',
                    enabled: true,
                    prompt: 'article_duplicate_content',
                    human_prompt: 'Does the text avoid duplicate words, sentences, or ideas?',
                    review_check: false,
                },
            },
            {
                name: 'Engagement & Hook',
                value: false,
                explanation: "While the article is clear and informative, it lacks a strong hook at the beginning to immediately capture the reader's attention. The opening simply states a definition of school leaders in straightforward language ('School leaders are people who help make our school a good place to learn'). The article maintains a simple, informative tone throughout but doesn't employ engaging techniques like questions, surprising facts, personal stories, or vivid scenarios that would make it particularly captivating. The content is organized well with clear explanations of different leadership roles, but it doesn't use literary devices, varied sentence structures, or compelling language that would elevate it to being truly engaging for readers.",
                passed_review: null,
                config: {
                    name: 'Engagement & Hook',
                    enabled: true,
                    prompt: 'article_engagement_and_hook',
                    human_prompt: 'Is the article presented in an engaging way, including a strong hook at the beginning?',
                    review_check: false,
                },
            },
            {
                name: 'Diverse Experiences',
                value: false,
                explanation: "The article about school leaders does not adequately include diverse perspectives and experiences. While it covers different roles within a school (principal, teachers, counselor, nurse, librarian), it presents a generic, one-size-fits-all description that lacks cultural diversity or varied experiences. There are no examples of school leaders from different backgrounds, cultures, or communities. The article doesn't acknowledge how school leadership might vary across different types of schools (urban, rural, international, etc.) or how students from various backgrounds might interact differently with these leaders. It also doesn't include perspectives from different family structures, socioeconomic backgrounds, or cultural contexts that would help all students see themselves reflected in the material. To be more inclusive, the article should incorporate diverse names, scenarios, and cultural references that represent the varied experiences of students.",
                passed_review: null,
                config: {
                    name: 'Diverse Experiences',
                    enabled: true,
                    prompt: 'article_diverse_experiences',
                    human_prompt: 'Does the text include diverse experiences so that all students can relate to the material?',
                    review_check: false,
                },
            },
            {
                name: 'Paragraph Structure',
                value: true,
                explanation: "Each paragraph in the article presents a clear, focused idea and remains self-contained. The first paragraph introduces the concept of school leaders. The subsequent paragraphs each focus on a specific school leader role (principal, teachers, counselor, nurse, librarian) with clear descriptions of their responsibilities. Each paragraph maintains internal coherence by staying focused on its specific topic, providing relevant details about the leader's role, and contributing to the overall theme of school leadership. The final paragraph effectively concludes by emphasizing how all school leaders work together. The paragraphs follow a logical structure, with appropriate transitions, and each one could stand alone as a complete thought while still connecting to the article's main topic.",
                passed_review: true,
                config: {
                    name: 'Paragraph Structure',
                    enabled: true,
                    prompt: 'article_paragraph_structure',
                    human_prompt: 'Does each paragraph present a clear idea and remain self-contained?',
                    review_check: true,
                },
            },
            {
                name: 'You Statements',
                value: true,
                explanation: "The article contains multiple 'You' statements that directly address the reader. Examples include: 'Teachers check your work and give you feedback to help you improve', 'The school counselor is another leader who can help when you feel sad or worried', 'They can check if you have a fever or need a bandage', and 'Next time you see a school leader, remember how they help make your school day better!'",
                passed_review: null,
                config: {
                    name: 'You Statements',
                    enabled: true,
                    prompt: 'article_you_statements',
                    human_prompt: 'Does the article contain any You statements?',
                    review_check: false,
                },
            },
            {
                name: 'Background Knowledge Relevance',
                value: true,
                explanation: "The article 'Who Are School Leaders?' stays focused on the topic throughout, providing relevant information about different types of school leaders (principals, teachers, counselors, nurses, and librarians) and their specific roles in the school environment. The content is appropriately tailored to what appears to be an elementary school audience, offering necessary background context about each leader's responsibilities in clear, simple language. The article considers what young readers may not know about these roles by explaining specific duties and how each leader contributes to the school community, without including extraneous information unrelated to school leadership.",
                passed_review: true,
                config: {
                    name: 'Background Knowledge Relevance',
                    enabled: true,
                    prompt: 'article_background_knowledge',
                    human_prompt: 'Does the article include only relevant information and provide necessary background context?',
                    review_check: true,
                },
            },
            {
                name: 'Single Correct Answer',
                value: true,
                explanation: "Each comprehension question has only one correct answer that fits logically and grammatically in the blank. Question 1 requires 'principal' as the authority figure who enforces rules. Question 2 requires 'teacher' as the person who helps students learn in class. Question 3 requires 'school' as the place leaders work to improve. Question 4 requires 'fair' to describe how the principal treats everyone. Question 5 requires 'help' as the action counselors and nurses provide to students needing support. None of these answers are ambiguous or subjective within the context provided.",
                passed_review: true,
                config: {
                    name: 'Single Correct Answer',
                    enabled: true,
                    prompt: 'article_single_correct_answer',
                    human_prompt: 'Does each comprehension question have only one correct answer?',
                    review_check: true,
                },
            },
            {
                name: 'Question & Answer Format',
                value: true,
                explanation: 'The comprehension questions follow the expected format. Each question contains a blank (______) where the missing word belongs. There are exactly 5 questions in total. The answers are provided in the correct order corresponding to each question (1-5). The questions appear to be related to school roles and responsibilities, with answers that logically complete each sentence.',
                passed_review: true,
                config: {
                    name: 'Question & Answer Format',
                    enabled: true,
                    prompt: 'article_question_answer_format',
                    human_prompt: 'Do the questions and answers follow the expected format?',
                    review_check: true,
                },
            },
            {
                name: 'Inferential Question',
                value: true,
                explanation: "Questions 1-4 are taken directly from the article text: Q1 comes from 'The principal makes sure everyone follows the rules'; Q2 from 'A teacher helps students learn new things every day in class'; Q3 from 'School leaders are people who help make our school a good place to learn'; Q4 from 'the principal helps make things fair for everyone'. Question 5 requires inference because nowhere does the article explicitly state that 'the counselor and nurse help students who need support' together. The reader must connect that both professionals provide different types of support (counselor helps with emotional needs, nurse with physical health) to infer they both 'help students who need support'.",
                passed_review: true,
                config: {
                    name: 'Inferential Question',
                    enabled: true,
                    prompt: 'article_inferential_question',
                    human_prompt: 'Are Questions 1-4 taken directly from the article and is Question 5 inferential?',
                    review_check: true,
                },
            },
        ],
        evaluation_results: {
            flesch_score: false,
            num_words: true,
            num_characters_question_1: true,
            num_characters_question_2: true,
            num_characters_question_3: true,
            num_characters_question_4: true,
            num_characters_question_5: true,
            words_presence_percentage: true,
            'Alignment with Objective': true,
            'Alignment with Learning Goal': true,
            'Comprehension Questions Accuracy': true,
            'Answer Accuracy': true,
            'Clarity & Directness': true,
            'Bias & Objectivity': true,
            'Paragraph Structure': true,
            'Background Knowledge Relevance': true,
            'Single Correct Answer': true,
            'Question & Answer Format': true,
            'Inferential Question': true,
        },
        passed_evaluation: false,
    },
    paragraphs_images: [
        {
            paragraph: 'School leaders are people who help make our school a good place to learn. They work hard every day to keep our school running smoothly and make sure everyone is learning and staying safe.',
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:ba0b6717-7c6e-446b-b4b9-63e0fd786e47/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:ba0b6717-7c6e-446b-b4b9-63e0fd786e47/prompt.json',
            },
        },
        {
            paragraph: 'The principal is an important school leader. The principal makes sure everyone follows the rules and stays safe. They visit each class to see how students are learning and talk with teachers about how to make lessons better. When there is a problem between students, the principal helps make things fair for everyone. They also lead school assemblies and special events.',
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:f4744d63-1a82-4ec3-a87e-76f5d6d7f3b0/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:f4744d63-1a82-4ec3-a87e-76f5d6d7f3b0/prompt.json',
            },
        },
        {
            paragraph: 'Teachers are also school leaders. A teacher helps students learn new things every day in class. They plan fun activities and make sure everyone understands the lessons. Teachers check your work and give you feedback to help you improve. They care about their students and want them to do their best. Teachers also talk to parents about how students are doing in school.',
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:5a78576f-6b9c-441d-84dc-d7b3d9c54e55/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:5a78576f-6b9c-441d-84dc-d7b3d9c54e55/prompt.json',
            },
        },
        {
            paragraph: 'The school counselor is another leader who can help when you feel sad or worried. They listen to students and give good advice. The counselor might visit your class to teach about feelings or how to be a good friend. They can also help students who need extra support with their schoolwork.',
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:3ada0ff5-faca-48cb-a6d8-064b64ada27e/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:3ada0ff5-faca-48cb-a6d8-064b64ada27e/prompt.json',
            },
        },
        {
            paragraph: "The school nurse is a leader who helps when students don't feel well. They can check if you have a fever or need a bandage. The nurse teaches students how to stay healthy too. They keep track of students' health records and call parents if a student gets sick at school.",
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:9ac0695a-aca2-4e9b-8355-423c07a401fe/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:9ac0695a-aca2-4e9b-8355-423c07a401fe/prompt.json',
            },
        },
        {
            paragraph: 'The librarian helps students find books they will enjoy. They teach classes about how to find information and use computers. The librarian makes the library a fun place to visit.',
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:18571596-055f-4f6b-90cc-76fa2bc19696/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:18571596-055f-4f6b-90cc-76fa2bc19696/prompt.json',
            },
        },
        {
            paragraph: 'All school leaders work together as a team. They want to make sure school is a safe and happy place where everyone can learn. Next time you see a school leader, remember how they help make your school day better!',
            image_data: {
                image_s3_bucket: 'ai-ice-generation-dev',
                image_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:1a921ef4-274b-4bfc-a40e-fcf7befa670a/image.png',
                image_prompt_s3_path: 'generate/image/year=2025/month=05/day=20/arn:aws:states:us-east-1:373983736669:execution:ice-sfn-image-dev:1a921ef4-274b-4bfc-a40e-fcf7befa670a/prompt.json',
            },
        },
    ],
};
//# sourceMappingURL=aiceApi.js.map