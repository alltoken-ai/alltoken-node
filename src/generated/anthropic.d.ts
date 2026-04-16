/* eslint-disable */
/* auto-generated from anthropic.yml — do not edit by hand. */
/* Regenerate via: npm run generate */

export interface paths {
    "/v1/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a message
         * @description Anthropic Messages API 兼容端点。支持流式（SSE）与非流式响应。
         *
         *     流式响应（`stream: true`）返回 `text/event-stream`，事件类型：
         *     `message_start` / `content_block_start` / `content_block_delta` /
         *     `content_block_stop` / `message_delta` / `message_stop` / `ping` / `error`。
         */
        post: operations["createAnthropicMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/models": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List available models
         * @description 返回可用模型列表（Anthropic 兼容格式）。
         *
         *     Claude Code 启动时会调用此端点做模型选择；CLI 客户端也可用此接口发现当前
         *     网关支持的 Claude 模型 ID。
         */
        get: operations["listAnthropicModels"];
        put?: never;
        post?: never;
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
        MessageRequest: {
            /**
             * @description 模型 ID（见 GET /v1/models）
             * @example claude-sonnet-4-5
             */
            model: string;
            /**
             * @description 生成的最大 token 数
             * @example 1024
             */
            max_tokens: number;
            messages: components["schemas"]["InputMessage"][];
            /** @description System prompt（字符串 或 ContentBlock 数组） */
            system?: string | components["schemas"]["ContentBlock"][];
            /**
             * @description 是否以 SSE 流式返回
             * @default false
             */
            stream: boolean;
            temperature?: number;
            top_p?: number;
            top_k?: number;
            stop_sequences?: string[];
            tools?: components["schemas"]["Tool"][];
            /** @description 工具选择策略：`{type: auto}` / `{type: any}` / `{type: tool, name: ...}` */
            tool_choice?: unknown;
            metadata?: {
                /** @description 终端用户标识 */
                user_id?: string;
            };
            /** @description Extended thinking 配置 */
            thinking?: {
                /** @enum {string} */
                type?: "enabled";
                budget_tokens?: number;
            };
            /** @description 顶层自动缓存控制，如 `{type: ephemeral, ttl: 1h}` */
            cache_control?: Record<string, never>;
        };
        InputMessage: {
            /** @enum {string} */
            role: "user" | "assistant";
            /** @description 字符串或 ContentBlock 数组 */
            content: string | components["schemas"]["ContentBlock"][];
        };
        ContentBlock: {
            /** @enum {string} */
            type: "text" | "image" | "tool_use" | "tool_result";
            /** @description type=text 时的文本内容 */
            text?: string;
            /** @description type=tool_use 时的工具调用 ID */
            id?: string;
            /** @description type=tool_use 时的工具名 */
            name?: string;
            /** @description type=tool_use 时的工具参数（任意 JSON） */
            input?: unknown;
            /** @description 块级缓存控制，如 `{type: ephemeral, ttl: 1h}` */
            cache_control?: Record<string, never>;
        };
        Tool: {
            name: string;
            description?: string;
            /** @description JSON Schema 对象 */
            input_schema: Record<string, never>;
            cache_control?: Record<string, never>;
        };
        MessageResponse: {
            /** @example msg_01XFDUDYJgAACzvnptvVoYEL */
            id: string;
            /** @enum {string} */
            type: "message";
            /** @enum {string} */
            role: "assistant";
            content: components["schemas"]["ContentBlock"][];
            model: string;
            /** @enum {string|null} */
            stop_reason: "end_turn" | "max_tokens" | "stop_sequence" | "tool_use" | null;
            stop_sequence?: string | null;
            usage: components["schemas"]["Usage"];
        };
        Usage: {
            input_tokens: number;
            output_tokens: number;
            cache_creation_input_tokens?: number;
            cache_read_input_tokens?: number;
        };
        ModelList: {
            data: components["schemas"]["ModelInfo"][];
            has_more?: boolean;
            first_id?: string;
            last_id?: string;
        };
        ModelInfo: {
            id: string;
            /** @enum {string} */
            type: "model";
            display_name?: string;
            /** Format: date-time */
            created_at?: string;
        };
        ErrorResponse: {
            /** @enum {string} */
            type: "error";
            error: {
                /** @enum {string} */
                type: "invalid_request_error" | "authentication_error" | "permission_error" | "not_found_error" | "rate_limit_error" | "api_error" | "overloaded_error";
                message: string;
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
                /**
                 * @example {
                 *       "type": "error",
                 *       "error": {
                 *         "type": "invalid_request_error",
                 *         "message": "messages is required"
                 *       }
                 *     }
                 */
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 鉴权失败（x-api-key 缺失或无效） */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description 余额不足 */
        InsufficientBalance: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                /**
                 * @example {
                 *       "type": "error",
                 *       "error": {
                 *         "type": "permission_error",
                 *         "message": "insufficient balance"
                 *       }
                 *     }
                 */
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
    createAnthropicMessage: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MessageRequest"];
            };
        };
        responses: {
            /** @description 成功响应（非流式返回 JSON，流式返回 SSE 事件流） */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponse"];
                    /**
                     * @example event: message_start
                     *     data: {"type":"message_start","message":{"id":"msg_01...","type":"message","role":"assistant","content":[],"model":"claude-sonnet-4-5","stop_reason":null,"usage":{"input_tokens":25,"output_tokens":1}}}
                     *
                     *     event: content_block_delta
                     *     data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Hello"}}
                     *
                     *     event: message_stop
                     *     data: {"type":"message_stop"}
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
    listAnthropicModels: {
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
                     *       "data": [
                     *         {
                     *           "type": "model",
                     *           "id": "claude-sonnet-4-5",
                     *           "display_name": "Claude Sonnet 4.5",
                     *           "created_at": "2025-09-29T00:00:00Z"
                     *         },
                     *         {
                     *           "type": "model",
                     *           "id": "claude-opus-4-6",
                     *           "display_name": "Claude Opus 4.6",
                     *           "created_at": "2026-02-01T00:00:00Z"
                     *         }
                     *       ],
                     *       "has_more": false,
                     *       "first_id": "claude-sonnet-4-5",
                     *       "last_id": "claude-opus-4-6"
                     *     }
                     */
                    "application/json": components["schemas"]["ModelList"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
}
