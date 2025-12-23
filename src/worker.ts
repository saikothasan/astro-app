import { App } from 'astro/app';
import type { SSRManifest } from 'astro';
import { DurableObject } from 'cloudflare:workers';

// Define the Environment Interface
export interface Env {
  DB: D1Database;
  COMMENT_DO: DurableObjectNamespace;
  ASSETS: Fetcher;
}

// Optional: A Durable Object for managing active comment viewers (Real-time logic)
export class CommentDO extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }
  async fetch(request: Request) {
    // Simple counter example or websocket handler
    return new Response("Durable Object Active");
  }
}

// The Integration Logic
export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  const fetch = async (request: Request, env: Env, ctx: ExecutionContext) => {
    // 1. Intercept specific routes if you want to bypass Astro (Optional)
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/custom-worker-route')) {
       return new Response("Handled by Worker directly!");
    }

    // 2. Otherwise, render the Astro App
    return app.render(request, { env, ctx });
  };

  return {
    default: { fetch },
    CommentDO // Export the class so Cloudflare can find it
  };
}
