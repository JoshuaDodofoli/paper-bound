<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Workspace Toolchain

In this workspace, prefer the native WSL Node.js toolchain by absolute path:
- `node`: `/home/zahemen/.nvm/versions/node/v22.14.0/bin/node`
- `npm`: `/home/zahemen/.nvm/versions/node/v22.14.0/bin/npm`

Do not fall back to the Windows Node/NPM binaries under `/mnt/c/Program Files/nodejs/` for repo-local installs, lint, build, or dev commands; they break on WSL UNC working directories in this harness.
<!-- END:nextjs-agent-rules -->
