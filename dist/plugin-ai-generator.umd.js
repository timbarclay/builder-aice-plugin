(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('@emotion/core'), require('@builder.io/sdk'), require('@material-ui/core'), require('mobx')) :
    typeof define === 'function' && define.amd ? define(['react', '@emotion/core', '@builder.io/sdk', '@material-ui/core', 'mobx'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.aiGenerator = factory(global.react, global.core, global.sdk, global.core$1, global.mobx));
})(this, (function (react, core, sdk, core$1, mobx) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /** @jsx jsx */
    function GeneratorForm({ lessonData, disabled, onGenerate }) {
        var _a, _b, _c;
        const [title, setTitle] = react.useState(lessonData.get('name') || '');
        const [learningObjective, setLearningObjective] = react.useState(((_a = lessonData.get('skill')) === null || _a === void 0 ? void 0 : _a.value.data.learningObjective) || '');
        const [learningGoal, setLearningGoal] = react.useState(((_b = lessonData.get('skill')) === null || _b === void 0 ? void 0 : _b.value.data.learningGoal) || '');
        const [targetWordCount, setTargetWordCount] = react.useState(300);
        const [vocabularyWords, setVocabularyWords] = react.useState(((_c = mobx.toJS(lessonData.get('vocabularyWords'))) === null || _c === void 0 ? void 0 : _c.map((w) => { var _a; return (_a = w === null || w === void 0 ? void 0 : w.word) === null || _a === void 0 ? void 0 : _a.Default; }).join(', ')) || '');
        const handleGenerate = () => {
            onGenerate({
                title,
                learningObjective,
                learningGoal,
                targetWordCount,
                vocabularyWords: vocabularyWords.split(',').map((w) => w.trim()).filter((w) => w),
            });
        };
        return (core.jsx(core$1.Paper, { css: { padding: 24, height: '100%' } },
            core.jsx(core$1.Typography, { variant: "h6", css: { marginBottom: 16 } }, "Content Generation Settings"),
            core.jsx("div", { css: { marginBottom: 16 } },
                core.jsx(core$1.TextField, { label: "Title", fullWidth: true, variant: "outlined", value: title, onChange: (e) => setTitle(e.target.value) })),
            core.jsx("div", { css: { marginBottom: 16 } },
                core.jsx(core$1.TextField, { label: "Learning Objective", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningObjective, onChange: (e) => setLearningObjective(e.target.value) })),
            core.jsx("div", { css: { marginBottom: 16 } },
                core.jsx(core$1.TextField, { label: "Learning Goal", fullWidth: true, multiline: true, rows: 2, variant: "outlined", value: learningGoal, onChange: (e) => setLearningGoal(e.target.value) })),
            core.jsx("div", { css: { marginBottom: 16 } },
                core.jsx(core$1.TextField, { label: "Target Word Count", fullWidth: true, type: "number", variant: "outlined", value: targetWordCount, onChange: (e) => setTargetWordCount(parseInt(e.target.value) || 300) })),
            core.jsx("div", { css: { marginBottom: 24 } },
                core.jsx(core$1.TextField, { label: "Vocabulary Words", fullWidth: true, multiline: true, rows: 3, variant: "outlined", placeholder: "Enter words separated by commas", value: vocabularyWords, onChange: (e) => setVocabularyWords(e.target.value), helperText: "Separate multiple words with commas" })),
            core.jsx(core$1.Button, { variant: "contained", color: "primary", fullWidth: true, size: "large", onClick: handleGenerate, disabled: disabled }, "Generate Content")));
    }

    function Preview({ content }) {
        if (!content) {
            return core.jsx("div", null, "Preview");
        }
        return (core.jsx(core$1.Paper, { css: { padding: 24, height: '100%', overflow: 'auto' } },
            core.jsx(core$1.Typography, { variant: "h6", css: { marginBottom: 16 } }, "Generated Content"),
            core.jsx("div", { css: { marginBottom: 24 } },
                core.jsx(core$1.Typography, { variant: "subtitle2", css: { marginBottom: 8, fontWeight: 'bold' } }, "Article:"),
                core.jsx(core$1.Typography, { variant: "body2", css: { whiteSpace: 'pre-wrap', lineHeight: 1.6 } }, content.body)),
            core.jsx(core$1.Divider, { css: { marginBottom: 16 } }),
            core.jsx(core$1.Typography, { variant: "subtitle2", css: { marginBottom: 12, fontWeight: 'bold' } }, "Comprehension Questions:"),
            content.questions.map((q, index) => (core.jsx("div", { key: index, css: { marginBottom: 12 } },
                core.jsx(core$1.Typography, { variant: "body2", css: { fontWeight: 500 } },
                    index + 1,
                    ". ",
                    q.question),
                core.jsx(core$1.Typography, { variant: "body2", color: "textSecondary", css: { marginLeft: 16 } },
                    "Answer: ",
                    q.answer))))));
    }

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

    function getS3Object(accessKeyId, secretAccessKey, s3Uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(mock);
            // Convert s3://bucket/key to https://bucket.s3.region.amazonaws.com/key
            // const match = s3Uri.match(/^s3:\/\/([^\/]+)\/(.+)$/);
            // if (!match) {
            //   throw new Error(`Invalid S3 URI format: ${s3Uri}`);
            // }
            // const bucket = match[1];
            // const key = match[2];
            // const region = 'us-east-1';
            // const httpsUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
            // const url = new URL(httpsUrl);
            // const service = 's3';
            // const now = new Date();
            // const isoDate = now.toISOString().replace(/[:\-]|\.\d{3}/g, '');
            // const dateStamp = isoDate.slice(0, 8);
            // // Create canonical request
            // const method = 'GET';
            // const canonicalUri = `/${key}`;
            // const canonicalQuerystring = '';
            // const canonicalHeaders = `host:${url.hostname}\nx-amz-date:${isoDate}\n`;
            // const signedHeaders = 'host;x-amz-date';
            // const payloadHash = await sha256('');
            // const canonicalRequest = [
            //   method,
            //   canonicalUri,
            //   canonicalQuerystring,
            //   canonicalHeaders,
            //   signedHeaders,
            //   toHex(payloadHash)
            // ].join('\n');
            // // Create string to sign
            // const algorithm = 'AWS4-HMAC-SHA256';
            // const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
            // const stringToSign = [
            //   algorithm,
            //   isoDate,
            //   credentialScope,
            //   toHex(await sha256(canonicalRequest))
            // ].join('\n');
            // // Calculate signature
            // const kDate = await hmac(`AWS4${secretAccessKey}`, dateStamp);
            // const kRegion = await hmac(kDate, region);
            // const kService = await hmac(kRegion, service);
            // const kSigning = await hmac(kService, 'aws4_request');
            // const signature = toHex(await hmac(kSigning, stringToSign));
            // // Create authorization header
            // const authorization = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
            // // Make the request
            // const response = await fetch(httpsUrl, {
            //   headers: {
            //     'Authorization': authorization,
            //     'x-amz-date': isoDate
            //   }
            // });
            // if (!response.ok) {
            //   throw new Error(`S3 request failed: ${response.status} ${response.statusText}`);
            // }
            // const text = await response.text();
            // return JSON.parse(text);
        });
    }
    const mock = {
        article_text: '{"body": "A school has many people who work together. These people help to make school a good place to learn. They are called school leaders. Each leader has special jobs that keep the school running smoothly every day.\\n\\nThe principal is an important school leader. The principal makes sure the school is safe for everyone. They help teachers do their jobs well and solve big problems. When students have big problems, they can talk to the principal. Principals also make important rules for the school.\\n\\nTeachers are also school leaders. A teacher helps students learn new things in many subjects like reading and math. They make the class fun and exciting with interesting activities. Teachers help students when they don\'t understand something and cheer for them when they do well.\\n\\nSome schools have a counselor. A counselor helps students who feel sad or mad about things at school or home. They teach students how to be good friends and solve problems with words. A counselor makes sure school is fair for everyone and that all students have what they need to learn.\\n\\nThe school nurse is another leader you might see. The nurse helps when students get hurt or feel sick during the school day. They check students\' eyes and ears to make sure they can see and hear well. They teach students how to stay healthy by washing hands and eating good food too.\\n\\nStudents can be leaders too! Some students help their friends with hard work. Some keep the classroom clean by picking up trash and organizing books. Others make sure games at recess are fair for all kids by including everyone who wants to play.\\n\\nAll these leaders work together to make school a happy place. They help everyone learn and grow each day. Next time you are at school, look for all the leaders who help you every day!", "questions": [{"question": "A teacher helps students learn new things in _____.", "answer": "class"}, {"question": "School leaders work together to make ______ a good place to learn.", "answer": "school"}, {"question": "The counselor makes sure school is ______ for everyone.", "answer": "fair"}, {"question": "Some students ______ their friends with hard work.", "answer": "help"}, {"question": "Based on the article, school leaders probably want students to feel ______ at school.", "answer": "happy"}]}',
    };

    function GeneratorPane({ lessonData, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey, context }) {
        var _a, _b;
        const userId = context.user.id;
        const contentId = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingContentModel) === null || _b === void 0 ? void 0 : _b.id;
        const userContentId = `${userId}-${contentId}`;
        const settings = context.user.organization.value.settings.plugins;
        const [isGenerating, setIsGenerating] = react.useState(false);
        const [generationStatus, setGenerationStatus] = react.useState('');
        const [generatedContent, setGeneratedContent] = react.useState(null);
        const [error, setError] = react.useState(null);
        const [currentGenerationId, setCurrentGenerationId] = react.useState(null);
        const pollingIntervalRef = react.useRef(null);
        const apiRef = react.useRef(null);
        const startPolling = (api, generationId) => {
            setCurrentGenerationId(generationId);
            const pollStatus = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const status = yield api.generationStatus(generationId);
                    setGenerationStatus(`Status: ${status.generation_status}`);
                    if (status.generation_status === 'COMPLETED') {
                        if (pollingIntervalRef.current) {
                            clearInterval(pollingIntervalRef.current);
                            pollingIntervalRef.current = null;
                        }
                        // Get generated content from S3
                        setGenerationStatus('Retrieving generated content...');
                        const result = yield getS3Object(awsAccessKeyId, awsSecretAccessKey, status.output_location);
                        const content = JSON.parse(result.article_text);
                        setGeneratedContent(content);
                        setGenerationStatus('Generation completed successfully!');
                        setIsGenerating(false);
                        setCurrentGenerationId(null);
                    }
                    else if (status.generation_status === 'FAILED') {
                        if (pollingIntervalRef.current) {
                            clearInterval(pollingIntervalRef.current);
                            pollingIntervalRef.current = null;
                        }
                        throw new Error('Generation failed');
                    }
                }
                catch (err) {
                    if (pollingIntervalRef.current) {
                        clearInterval(pollingIntervalRef.current);
                        pollingIntervalRef.current = null;
                    }
                    const errorMessage = err instanceof Error ? err.message : 'Status check failed';
                    setError(errorMessage);
                    setGenerationStatus('');
                    setIsGenerating(false);
                    setCurrentGenerationId(null);
                }
            });
            // Start polling immediately, then every 10 seconds
            pollStatus();
            pollingIntervalRef.current = window.setInterval(pollStatus, 10000);
        };
        const stopGeneration = () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
            setIsGenerating(false);
            setGenerationStatus('Generation cancelled');
            setCurrentGenerationId(null);
        };
        // Initialize from stored state and start polling if needed
        react.useEffect(() => {
            const storedGenerationId = settings.get(userContentId);
            if (storedGenerationId && clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey) {
                setCurrentGenerationId(storedGenerationId);
                setIsGenerating(true);
                setGenerationStatus('Resuming previous generation...');
                const api = new AiceApi(clientId, clientSecret);
                apiRef.current = api;
                startPolling(api, storedGenerationId);
            }
        }, [userContentId, clientId, clientSecret, awsAccessKeyId, awsSecretAccessKey]);
        // Cleanup polling on unmount
        react.useEffect(() => {
            return () => {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                }
            };
        }, []);
        // Persist currentGenerationId changes
        react.useEffect(() => {
            if (currentGenerationId) {
                settings.set(userContentId, currentGenerationId);
                context.user.organization.save();
            }
        }, [currentGenerationId, userContentId]);
        const onGenerate = (parameters) => __awaiter(this, void 0, void 0, function* () {
            if (!clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey) {
                setError('Missing credentials');
                return;
            }
            setIsGenerating(true);
            setError(null);
            setGeneratedContent(null);
            setGenerationStatus('Starting generation...');
            try {
                const api = new AiceApi(clientId, clientSecret);
                apiRef.current = api;
                // Start generation
                setGenerationStatus('Submitting generation request...');
                const response = yield api.generateArticle(parameters.title, parameters.learningObjective, parameters.learningGoal, parameters.targetWordCount, parameters.vocabularyWords);
                // Start polling for completion
                setGenerationStatus('Generation in progress...');
                startPolling(api, response.generation_id);
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Generation failed';
                setError(errorMessage);
                setGenerationStatus('');
                setIsGenerating(false);
            }
        });
        return (core.jsx(core$1.Grid, { container: true, css: { height: '100%' } },
            core.jsx(core$1.Grid, { item: true, xs: 12, lg: 6 },
                core.jsx(GeneratorForm, { lessonData: lessonData, disabled: !clientId || !clientSecret || !awsAccessKeyId || !awsSecretAccessKey || isGenerating, onGenerate: onGenerate })),
            core.jsx(core$1.Grid, { item: true, xs: 12, lg: 6 },
                core.jsx("div", { css: { padding: 24, height: '100%' } },
                    isGenerating && (core.jsx("div", { css: { textAlign: 'center', padding: 20 } },
                        core.jsx(core$1.CircularProgress, { css: { marginBottom: 16 } }),
                        core.jsx(core$1.Typography, { variant: "body2", color: "textSecondary", css: { marginBottom: 16 } }, generationStatus),
                        core.jsx(core$1.Button, { variant: "outlined", onClick: stopGeneration, size: "small" }, "Cancel Generation"))),
                    error && (core.jsx("div", { css: { padding: 20, backgroundColor: '#ffebee', borderRadius: 4 } },
                        core.jsx(core$1.Typography, { variant: "body2", color: "error" },
                            "Error: ",
                            error))),
                    generatedContent && !isGenerating && (core.jsx(Preview, { content: generatedContent })),
                    !isGenerating && !generatedContent && !error && (core.jsx("div", { css: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: '#666',
                            textAlign: 'center'
                        } },
                        core.jsx(core$1.Typography, { variant: "body2" }, "Fill out the form and click \"Generate Content\" to create your lesson")))))));
    }

    /** @jsx jsx */
    function AiGenerator({ context }) {
        var _a, _b, _c, _d;
        console.log('context', context);
        const organisation = context.user.organization;
        const settings = organisation.value.settings.plugins;
        const [clientId, setClientId] = react.useState(settings.get('aiClientId'));
        const [clientSecret, setClientSecret] = react.useState(settings.get('aiClientSecret'));
        const [awsAccessKeyId, setAwsAccessKeyId] = react.useState(settings.get('aiAwsAccessKeyId'));
        const [awsSecretAccessKey, setAwsSecretAccessKey] = react.useState(settings.get('aiAwsSecretAccessKey'));
        const [modalOpen, setModalOpen] = react.useState(false);
        const [formData, setFormData] = react.useState({
            clientId: clientId || '',
            clientSecret: clientSecret || '',
            awsAccessKeyId: awsAccessKeyId || '',
            awsSecretAccessKey: awsSecretAccessKey || ''
        });
        const type = (_b = (_a = context.designerState) === null || _a === void 0 ? void 0 : _a.editingModel) === null || _b === void 0 ? void 0 : _b.name;
        if (type !== 'lesson') {
            return core.jsx("div", { css: { padding: 16, height: '100vh' } },
                core.jsx(core$1.Typography, { variant: "h4", css: { marginBottom: 16 } }, "Sorry, AI Generator is currently only available for lessons"));
        }
        const lessonData = (_d = (_c = context.designerState) === null || _c === void 0 ? void 0 : _c.editingContentModel) === null || _d === void 0 ? void 0 : _d.data;
        if (!lessonData) {
            return core.jsx("div", { css: { padding: 16, height: '100vh' } },
                core.jsx(core$1.Typography, { variant: "h4", css: { marginBottom: 16 } }, "No lesson data found"));
        }
        const requiresCredentials = !(clientId && clientSecret && awsAccessKeyId && awsSecretAccessKey);
        const handleSaveCredentials = () => {
            setClientId(formData.clientId);
            setClientSecret(formData.clientSecret);
            setAwsAccessKeyId(formData.awsAccessKeyId);
            setAwsSecretAccessKey(formData.awsSecretAccessKey);
            settings.set('aiClientId', formData.clientId);
            settings.set('aiClientSecret', formData.clientSecret);
            settings.set('aiAwsAccessKeyId', formData.awsAccessKeyId);
            settings.set('aiAwsSecretAccessKey', formData.awsSecretAccessKey);
            organisation.save();
            setModalOpen(false);
        };
        const model = lessonData.get('name');
        return (core.jsx("div", { css: { padding: 16, height: '100vh' } },
            core.jsx("div", { css: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
                core.jsx(core$1.Typography, { variant: "h4" },
                    "Use AICE to generate lesson resources for ",
                    model),
                core.jsx(core$1.Button, { variant: "outlined", onClick: () => setModalOpen(true) }, "Set Credentials")),
            !requiresCredentials &&
                core.jsx(GeneratorPane, { lessonData: lessonData, clientId: clientId, clientSecret: clientSecret, awsAccessKeyId: awsAccessKeyId, awsSecretAccessKey: awsSecretAccessKey, context: context }),
            core.jsx(core$1.Dialog, { open: modalOpen, onClose: () => setModalOpen(false), maxWidth: "sm", fullWidth: true },
                core.jsx(core$1.DialogTitle, null, "Set AI Credentials"),
                core.jsx(core$1.DialogContent, { css: { paddingTop: 20 } },
                    core.jsx("div", { css: { marginBottom: 16 } },
                        core.jsx(core$1.TextField, { autoFocus: true, label: "Client ID", fullWidth: true, variant: "outlined", value: formData.clientId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientId: e.target.value })) })),
                    core.jsx("div", { css: { marginBottom: 16 } },
                        core.jsx(core$1.TextField, { label: "Client Secret", type: "password", fullWidth: true, variant: "outlined", value: formData.clientSecret, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { clientSecret: e.target.value })) })),
                    core.jsx("div", { css: { marginBottom: 16 } },
                        core.jsx(core$1.TextField, { label: "AWS Access Key ID", fullWidth: true, variant: "outlined", value: formData.awsAccessKeyId, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsAccessKeyId: e.target.value })) })),
                    core.jsx("div", { css: { marginBottom: 16 } },
                        core.jsx(core$1.TextField, { label: "AWS Secret Access Key", type: "password", fullWidth: true, variant: "outlined", value: formData.awsSecretAccessKey, onChange: (e) => setFormData(Object.assign(Object.assign({}, formData), { awsSecretAccessKey: e.target.value })) }))),
                core.jsx(core$1.DialogActions, null,
                    core.jsx(core$1.Button, { onClick: () => setModalOpen(false) }, "Cancel"),
                    core.jsx(core$1.Button, { onClick: handleSaveCredentials, color: "primary" }, "Save")))));
    }
    sdk.Builder.register('editor.mainTab', {
        name: '✨ AI Generator',
        component: AiGenerator,
    });

    return AiGenerator;

}));
//# sourceMappingURL=plugin-ai-generator.umd.js.map
