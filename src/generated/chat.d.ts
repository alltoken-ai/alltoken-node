/* eslint-disable */
/* auto-generated from chat.yml — do not edit by hand. */
/* Regenerate via: npm run generate */

export interface paths {
    "/chat/completions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create chat completion
         * @description OpenAI 兼容 chat completions。支持流式（`stream: true` 返回 SSE）与非流式。
         *
         *     **扩展字段**（网关额外支持，非 OpenAI 标准）：
         *     - `thinking` / `thinking_budget` — 思考链控制
         *     - `enable_search` — 联网搜索
         *     - `conversation_id` — 关联网关托管的会话用于消息持久化
         */
        post: operations["createChatCompletion"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create message (Anthropic format, under /v1)
         * @description Anthropic Messages API 的历史暴露路径。**新集成请使用 `/anthropic/v1/messages`**
         *     （见 anthropic.yml）。本端点保留是因为部分早期客户端硬编码了 `/v1/messages`。
         *
         *     请求/响应格式与 `/anthropic/v1/messages` **完全相同**，但鉴权方式为
         *     `Authorization: Bearer`（OpenAI 风格），而非 `x-api-key`。
         */
        post: operations["createMessageViaV1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/models": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List models
         * @description 返回网关当前支持的全部模型（OpenAI 兼容格式）
         */
        get: operations["listModels"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/generations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List video generation tasks */
        get: operations["listVideoGenerations"];
        put?: never;
        /**
         * Create a video generation task
         * @description 创建异步视频生成任务。返回任务 ID，使用 `GET /videos/generations/{id}` 轮询状态。
         */
        post: operations["createVideoGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/generations/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get video generation task */
        get: operations["getVideoGeneration"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/videos/generations/{id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancel video generation task */
        post: operations["cancelVideoGeneration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ChatCompletionRequest: {
            /** @example gpt-4o-mini */
            model: string;
            messages: components["schemas"]["ChatMessage"][];
            /** @default false */
            stream: boolean;
            stream_options?: {
                include_usage?: boolean;
            };
            max_tokens?: number;
            temperature?: number;
            top_p?: number;
            top_k?: number;
            stop?: string[];
            user?: string;
            tools?: components["schemas"]["Tool"][];
            /** @description `auto` / `none` / `required` / `{type: function, function: {name: ...}}` */
            tool_choice?: unknown;
            response_format?: {
                /** @enum {string} */
                type?: "text" | "json_object";
            };
            /** @description 网关扩展 —— 启用联网搜索 */
            enable_search?: boolean;
            frequency_penalty?: number;
            presence_penalty?: number;
            n?: number;
            /** @description 网关扩展 —— 启用思考链 */
            thinking?: boolean;
            /** @description 网关扩展 —— 思考链 token 预算 */
            thinking_budget?: number;
            /**
             * Format: int64
             * @description 网关扩展 —— 关联网关托管的会话 ID（自动持久化消息）
             */
            conversation_id?: number;
        };
        ChatMessage: {
            /** @enum {string} */
            role: "system" | "user" | "assistant" | "tool";
            /**
             * @description 消息内容：字符串，或 ContentPart 数组（多模态），或 null（assistant 返回 tool_calls 时）。
             *     JSON 层允许 null；SDK 用 Union/any 类型接收。
             */
            content?: string | components["schemas"]["ContentPart"][];
            name?: string;
            tool_calls?: components["schemas"]["ToolCall"][];
            /** @description role=tool 时必填 */
            tool_call_id?: string;
        };
        /** @description 多模态消息内容块（文本 / 图片 URL） */
        ContentPart: {
            /** @enum {string} */
            type: "text" | "image_url";
            /** @description type=text 时的文本内容 */
            text?: string;
            /** @description type=image_url 时的图片对象 */
            image_url?: {
                /** Format: uri */
                url?: string;
                /** @enum {string} */
                detail?: "auto" | "low" | "high";
            };
        };
        Tool: {
            /** @enum {string} */
            type: "function";
            function: {
                name: string;
                description?: string;
                /** @description JSON Schema */
                parameters?: Record<string, never>;
            };
        };
        ToolCall: {
            id: string;
            /** @enum {string} */
            type: "function";
            function: {
                name?: string;
                /** @description JSON 字符串 */
                arguments?: string;
            };
        };
        ChatCompletionResponse: {
            id: string;
            /** @enum {string} */
            object: "chat.completion";
            /** Format: int64 */
            created: number;
            model: string;
            choices: components["schemas"]["Choice"][];
            usage?: components["schemas"]["Usage"];
            system_fingerprint?: string;
            /** @description 网关扩展 —— 实际处理请求的 provider 名 */
            "x-gateway-provider"?: string;
            /** @description 网关扩展 —— 请求 ID（便于排查） */
            "x-gateway-request-id"?: string;
            /**
             * Format: int64
             * @description 网关扩展 —— 若请求触发自动建会话，返回新会话 ID
             */
            conversation_id?: number;
        };
        Choice: {
            index: number;
            message: components["schemas"]["ChatMessage"];
            /** @enum {string|null} */
            finish_reason?: "stop" | "length" | "tool_calls" | "content_filter" | null;
        };
        Usage: {
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
            prompt_tokens_details?: {
                cached_tokens?: number;
                cache_creation_input_tokens?: number;
            };
            completion_tokens_details?: {
                reasoning_tokens?: number;
            };
            cache_read_input_tokens?: number;
            /** @description Cache write 按 TTL 拆分，key=秒数（如 300、3600） */
            cache_creation_by_ttl?: {
                [key: string]: number;
            };
            server_tool_use?: {
                [key: string]: number;
            };
        };
        ModelList: {
            /** @enum {string} */
            object: "list";
            data: components["schemas"]["ModelInfo"][];
        };
        ModelInfo: {
            id: string;
            /** @enum {string} */
            object: "model";
            /** Format: int64 */
            created?: number;
            owned_by?: string;
        };
        VideoGenerationRequest: {
            /** @example seedance-1.5-pro */
            model: string;
            prompt: string;
            content?: components["schemas"]["VideoContentItem"][];
            /** @enum {string} */
            ratio?: "16:9" | "9:16" | "4:3" | "3:4" | "21:9" | "1:1" | "adaptive";
            /** @description 秒数；-1 表示智能时长 */
            duration?: number;
            /** @enum {string} */
            resolution?: "480p" | "720p" | "1080p";
            /** @description 帧数（优先级高于 duration） */
            frames?: number;
            /** @description 是否生成音频 */
            generate_audio?: boolean;
            /** @description 输入是否包含视频（图生视频） */
            input_has_video?: boolean;
            /** Format: int64 */
            seed?: number;
            camera_fixed?: boolean;
            /** @default false */
            watermark: boolean;
            /** Format: uri */
            callback_url?: string;
            return_last_frame?: boolean;
            /** @enum {string} */
            service_tier?: "default" | "flex";
            execution_expires_after?: number;
            draft?: boolean;
            tools?: {
                /** @enum {string} */
                type?: "web_search";
            }[];
            safety_identifier?: string;
        };
        VideoContentItem: {
            /** @enum {string} */
            type: "text" | "image_url" | "video_url" | "audio_url" | "draft_task" | "image" | "video" | "audio";
            text?: string;
            image_url?: {
                /** Format: uri */
                url?: string;
            };
            video_url?: {
                /** Format: uri */
                url?: string;
            };
            audio_url?: {
                /** Format: uri */
                url?: string;
            };
            draft_task?: {
                id?: string;
            };
            /** @enum {string} */
            role?: "first_frame" | "last_frame" | "reference_image" | "reference_video" | "reference_audio";
            /** @description 简化格式（type=image/video/audio 时） */
            url?: string;
        };
        VideoTaskResponse: {
            /** @example vgen_01abc */
            id: string;
            /** @enum {string} */
            status: "queued" | "processing" | "completed" | "failed" | "expired" | "cancelled";
            model: string;
            /** @enum {string} */
            input_type?: "text" | "image_first_frame" | "image_first_last_frame" | "image_reference" | "video_reference" | "multimodal" | "draft_task";
            /** Format: uri */
            video_url?: string;
            /** Format: date-time */
            video_url_expires_at?: string;
            /** @description 视频 URL 剩余有效秒数 */
            video_url_ttl?: number;
            /** Format: uri */
            last_frame_url?: string;
            duration?: number;
            frames?: number;
            fps?: number;
            resolution?: string;
            ratio?: string;
            /** Format: int64 */
            seed?: number;
            generate_audio?: boolean;
            input_has_video?: boolean;
            draft?: boolean;
            draft_task_id?: string;
            service_tier?: string;
            execution_expires_after?: number;
            safety_identifier?: string;
            tools?: Record<string, never>[];
            usage?: {
                completion_tokens?: number;
                total_tokens?: number;
                tool_usage?: {
                    web_search?: number;
                };
            };
            error?: {
                code?: string;
                message?: string;
            };
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at?: string;
            /** Format: date-time */
            completed_at?: string;
        };
        VideoListResponse: {
            items: components["schemas"]["VideoTaskResponse"][];
            total: number;
        };
        ErrorResponse: {
            error: {
                code?: string;
                message: string;
                param?: string | null;
                type: string;
                request_id?: string;
            };
        };
    };
    responses: {
        /** @description 请求参数错误 */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 鉴权失败 */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 余额不足（网关扩展的 402） */
        InsufficientBalance: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 超出限流 */
        RateLimited: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 资源不存在 */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 网关或上游错误 */
        ServerError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createChatCompletion: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChatCompletionRequest"];
            };
        };
        responses: {
            /** @description 非流式返回 JSON；流式返回 SSE */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatCompletionResponse"];
                    /**
                     * @example data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1700000000,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"role":"assistant","content":"Hi"},"finish_reason":null}]}
                     *
                     *     data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1700000000,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":10,"completion_tokens":1,"total_tokens":11}}
                     *
                     *     data: [DONE]
                     */
                    "text/event-stream": string;
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            429: components["responses"]["RateLimited"];
            500: components["responses"]["ServerError"];
        };
    };
    createMessageViaV1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": Record<string, never>;
            };
        };
        responses: {
            /** @description 同 anthropic.yml 的 MessageResponse（或 SSE 流） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                    "text/event-stream": string;
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["ServerError"];
        };
    };
    listModels: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 模型列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "object": "list",
                     *       "data": [
                     *         {
                     *           "id": "gpt-4o-mini",
                     *           "object": "model",
                     *           "created": 1700000000,
                     *           "owned_by": "openai"
                     *         },
                     *         {
                     *           "id": "claude-sonnet-4-5",
                     *           "object": "model",
                     *           "created": 1700000000,
                     *           "owned_by": "anthropic"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": components["schemas"]["ModelList"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    listVideoGenerations: {
        parameters: {
            query?: {
                limit?: number;
                /** @description queued / processing / completed / failed / expired / cancelled */
                status?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 任务列表 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoListResponse"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    createVideoGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VideoGenerationRequest"];
            };
        };
        responses: {
            /** @description 任务已创建 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoTaskResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            402: components["responses"]["InsufficientBalance"];
            429: components["responses"]["RateLimited"];
        };
    };
    getVideoGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 任务详情 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoTaskResponse"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    cancelVideoGeneration: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已取消 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["VideoTaskResponse"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description 任务已完成或已取消，无法再取消 */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
}
