/**
 * ⚡ E.ON Auto-Test: Unified 1-Command All-in-One Pipeline
 * Usage:
 *   npm run auto-test KFWT-1161
 *   npm run auto-test https://jira.eon.com/browse/KFWT-1161
 *
 * Windows-safety notes (READ BEFORE EDITING):
 * - `.cmd`/`.bat` shims (npx.cmd, copilot.cmd) MUST NOT be spawned with
 *   `shell: false` on Windows. Node.js historically wraps these internally
 *   via cmd.exe with argument escaping that is either insecure
 *   (CVE-2024-27980) or, on patched Node versions, overly strict and throws
 *   `EINVAL` for perfectly valid arguments (e.g. long text containing quotes
 *   or newlines). The safe, deterministic fix used here is to explicitly set
 *   `shell: true` on Windows and build+quote the full command line ourselves
 *   (see `safeSpawnSync` below), so cmd.exe always receives a single,
 *   correctly-escaped string.
 * - Never pass long, multi-line prompts as a CLI argument. Long prompts are
 *   written to a temp file and Copilot is instructed (with a short argument)
 *   to open and follow that file — this sidesteps both the EINVAL issue and
 *   cmd.exe's ~8191 character command line limit.
 */

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const IS_WINDOWS = process.platform === 'win32';
const ROOT_DIR = path.join(__dirname, '..');

/**
 * Quote a single argument for cmd.exe when it is embedded in a full command
 * line string (used only when shell: true on Windows). Wraps the value in
 * double quotes if it contains anything cmd.exe would otherwise split on,
 * and escapes embedded double quotes so they can't break out of the quoting.
 */
function quoteForCmd(value) {
  const str = String(value);
  if (str === '') return '""';
  if (!/[\s"&|<>^%!]/.test(str)) return str;
  const escaped = str.replace(/"/g, '\\"');
  return `"${escaped}"`;
}

/**
 * Cross-platform safe wrapper around spawnSync.
 * - On Windows: forces shell:true and manually builds/quotes the command
 *   line to avoid Node's buggy internal .cmd/.bat handling (EINVAL / CVE-2024-27980).
 * - On other platforms: uses shell:false (default, safe) with the args array.
 */
function safeSpawnSync(command, args, options = {}) {
  if (IS_WINDOWS) {
    const commandLine = [quoteForCmd(command), ...args.map(quoteForCmd)].join(' ');
    return spawnSync(commandLine, { ...options, shell: true });
  }
  return spawnSync(command, args, { ...options, shell: false });
}

/**
 * Resolve the correct Windows executable name for a CLI tool without
 * hardcoding a specific shim extension (`.cmd`, `.exe`, `.bat`, ...).
 *
 * Different install methods produce different shims for the same CLI name:
 *   - npm-installed CLIs on Windows usually ship a `<name>.cmd` shim.
 *   - Some tools (e.g. GitHub Copilot CLI) install a native `<name>.exe`.
 * Hardcoding `.cmd` breaks the `.exe` case with "not recognized as an
 * internal or external command" even though the binary exists on PATH.
 *
 * Strategy: scan PATH for the first existing `<name><ext>` following the
 * user's PATHEXT order (falls back to a sane default). If nothing is found
 * (e.g. running in an unusual shell), fall back to the bare command name --
 * cmd.exe (which we always invoke via `shell:true` in safeSpawnSync) will
 * then resolve it itself using PATHEXT, exactly like typing it interactively.
 */
function resolveWindowsBinary(command) {
  if (!IS_WINDOWS) return command;

  const pathExt = (process.env.PATHEXT || '.COM;.EXE;.BAT;.CMD')
    .split(';')
    .filter(Boolean);
  const pathDirs = (process.env.PATH || process.env.Path || '').split(path.delimiter).filter(Boolean);

  for (const dir of pathDirs) {
    for (const ext of pathExt) {
      const candidate = path.join(dir, `${command}${ext}`);
      if (fs.existsSync(candidate)) {
        return `${command}${ext}`;
      }
    }
  }

  // Not found on PATH via our own scan -- let cmd.exe resolve the bare name
  // itself via PATHEXT, same as a user typing `copilot` at the prompt.
  return command;
}

function printHeader(title) {
  console.log(`\n======================================================`);
  console.log(title);
  console.log(`======================================================\n`);
}

function fail(message, code = 1) {
  console.error(`\n\x1b[31m❌ ${message}\x1b[0m\n`);
  process.exit(code);
}

const target = process.argv[2];
if (!target) {
  console.log('\n\x1b[33m⚡ Usage: npm run auto-test <TICKET_KEY_OR_URL>\x1b[0m');
  console.log('   Example: npm run auto-test KFWT-1161');
  console.log('            npm run auto-test https://jira.eon.com/browse/KFWT-1161\n');
  process.exit(1);
}

const match = target.match(/([A-Z0-9]+-\d+)/i);
if (!match) {
  fail(`Could not parse a Jira ticket key (e.g. KFWT-1161) from "${target}".`);
}
const key = match[1].toUpperCase();

printHeader(`🚀 STARTING ALL-IN-ONE AUTOMATION PIPELINE FOR \x1b[36m${key}\x1b[0m`);

// ── STEP 1: FETCH JIRA TICKET + ATTACHMENTS ───────────────────────
function fetchJira() {
  console.log(`\x1b[1m[1/3] 📥 Ingesting Jira ticket & downloading media...\x1b[0m`);
  const fetchScript = path.join(__dirname, 'fetch-jira.js');
  const nodeBin = process.execPath;

  // Plain node.js binary is never a .cmd/.bat shim, so shell:false is safe here.
  const fetchResult = spawnSync(nodeBin, [fetchScript, target], {
    stdio: 'inherit',
    shell: false,
    cwd: ROOT_DIR
  });

  if (fetchResult.error) {
    fail(`Step 1 (Fetch Jira) could not be started: ${fetchResult.error.message}`);
  }
  if (fetchResult.status !== 0) {
    fail(
      `Step 1 (Fetch Jira) failed with exit code ${fetchResult.status}.\n` +
      `   -> Check your Jira SSO session (.auth/jira-profile) and ticket key "${key}", then retry.\n` +
      `   -> Pipeline stopped: Step 2/3 were NOT executed.`
    );
  }

  const ticketMdPath = path.join(ROOT_DIR, 'docs', 'tickets', `${key}.md`);
  if (!fs.existsSync(ticketMdPath)) {
    fail(
      `Step 1 (Fetch Jira) reported success but ${path.relative(ROOT_DIR, ticketMdPath)} was not found.\n` +
      `   -> Pipeline stopped: Step 2/3 were NOT executed.`
    );
  }
  return ticketMdPath;
}

// ── STEP 2: INVOKE COPILOT TO ANALYZE & GENERATE TESTCASE + SPEC ──
function generateTest() {
  console.log(`\n\x1b[1m[2/3] 🤖 Calling GitHub Copilot to analyze story & generate test spec (100% English)...\x1b[0m`);

  const relSpecPath = `tests/e2e/TC-${key}.spec.ts`;
  const fullSpecPath = path.join(ROOT_DIR, 'tests', 'e2e', `TC-${key}.spec.ts`);

  const fullPrompt = `You are executing the automated end-to-end test generation for ticket ${key}.

Source ticket: docs/tickets/${key}.md
Associated media: docs/tickets/${key}/attachments/ (if any)
Grounding sources: docs/specs/codebase/ui_components.yaml and docs/specs/codebase/state_machine.yaml
Business specs: docs/specs/process.yaml and docs/specs/roles.yaml

Instructions:
1. Follow .github/prompts/analyze-story.prompt.md to inspect media, ground components, and check for conflicts.
2. Follow .github/prompts/new-test.prompt.md to generate:
   - tests/testcases/TC-${key}.md (100% English Given/When/Then, keeping German UI labels)
   - tests/pages/<Feature>Page.ts (Page Object if new components are needed)
   - tests/e2e/TC-${key}.spec.ts (Playwright test spec)
3. Language requirement: ALL generated files, titles, test.step() descriptions, and comments MUST be
   written in 100% professional English. Keep original German domain/UI labels from Axon Ivy/KFWT
   verbatim where the real application displays them in German (e.g. "Quelle-Senke-Test") -- do NOT
   translate German UI labels into English, only the surrounding English prose/comments.
4. Modular Test Cases (MANDATORY): DO NOT collapse the whole story into a single testcase. Decompose
   it into independent sub test cases numbered TC-${key}-01, TC-${key}-02, TC-${key}-03, TC-${key}-04
   (add TC-${key}-05, -06, ... if more independent business aspects exist):
   - TC-${key}-01: UI & Default State verification (open the task/screen, verify read-only fields,
     new data card/fields render correctly, checkboxes/fields have correct default values).
   - TC-${key}-02: Negative / Validation verification (attempt the main action -- e.g. Complete --
     without satisfying required conditions -- e.g. before checking required checkboxes -- and
     confirm the action is blocked: button disabled or a validation error is shown).
   - TC-${key}-03: Positive / Happy Path verification (satisfy the required conditions, perform the
     main action, and confirm success plus the correct next step/state per the AC).
   - TC-${key}-04: Configuration / Skippable verification (if the AC mentions it -- confirm the task
     can be configured as skippable in the relevant administration screen, e.g. Workflow
     Administration).
   In tests/testcases/TC-${key}.md, give each TC-${key}-0X its own Given/When/Then and its own
   Expected Result section -- do not merge steps from different sub test cases into one shared table.
   In tests/e2e/TC-${key}.spec.ts, generate one independent test('TC-${key}-0X: ...', async ({ page })
   => { ... }) block per sub test case, all inside a single test.describe() for the file.
5. Feature-not-deployed safeguard: if the feature/UI described in the ticket is not actually present
   on BASE_URL (grounding sources / live app do not show it yet), DO NOT generate tests that will
   fail red. Instead add a guard at the very top of EVERY individual test('TC-${key}-0X: ...', ...)
   body that calls test.fixme(true, 'Feature not yet deployed on test server'), so the pipeline
   reports a neutral "fixme" status instead of a false failure. Apply this guard per test block, not
   just once for the file.
6. Output path is exactly: ${relSpecPath}

Generate or update these files now.`;

  const tmpPromptPath = path.join(ROOT_DIR, `.tmp-copilot-prompt-${key}.txt`);
  fs.writeFileSync(tmpPromptPath, fullPrompt, 'utf-8');

  // Short, safe instruction passed as the CLI argument -- the actual (long,
  // multi-line) prompt lives in the temp file so we never risk breaking
  // quoting/newlines on the command line.
  const shortInstruction =
    `Read the file ${path.relative(ROOT_DIR, tmpPromptPath).replace(/\\/g, '/')} in the current working directory ` +
    `and carry out ALL instructions written in it exactly, then generate/update the files it specifies.`;

  console.log(`⏳ Copilot AI is analyzing attachments, codebase OpenSpecs, and generating Playwright test...`);
  console.log(`   📄 Full prompt written to: ${path.relative(ROOT_DIR, tmpPromptPath)}`);

  const copilotBin = resolveWindowsBinary('copilot');
  const copilotResult = safeSpawnSync(copilotBin, ['-p', shortInstruction, '--allow-all'], {
    stdio: 'inherit',
    cwd: ROOT_DIR
  });

  // Clean up the temp prompt file regardless of outcome (also protected by .gitignore).
  fs.rmSync(tmpPromptPath, { force: true });

  if (copilotResult.error) {
    fail(
      `Step 2 (Copilot generate) could not be started: ${copilotResult.error.message}\n` +
      `   -> Make sure "copilot" CLI is installed and on PATH.\n` +
      `   -> Pipeline stopped: Step 3/3 was NOT executed.`
    );
  }
  if (copilotResult.status !== 0) {
    fail(
      `Step 2 (Copilot generate) failed with exit code ${copilotResult.status}.\n` +
      `   -> Pipeline stopped: Step 3/3 was NOT executed to avoid a confusing test run against a missing/incomplete spec.`
    );
  }
  if (!fs.existsSync(fullSpecPath)) {
    fail(
      `Step 2 (Copilot generate) exited successfully but expected spec file was not created:\n` +
      `   ${relSpecPath}\n` +
      `   -> Pipeline stopped: Step 3/3 was NOT executed.`
    );
  }

  console.log(`\x1b[32m✅ Step 2 completed: ${relSpecPath} generated.\x1b[0m`);
  return { relSpecPath, fullSpecPath };
}

// ── STEP 3: RUN PLAYWRIGHT TESTS ──────────────────────────────────
function runPlaywright(relSpecPath) {
  console.log(`\n\x1b[1m[3/3] 🧪 Running Playwright test verification...\x1b[0m\n`);

  // Playwright's test matcher expects forward-slash paths regardless of OS.
  const normalizedSpecPath = relSpecPath.split(path.sep).join('/');

  const npxBin = resolveWindowsBinary('npx');
  const testResult = safeSpawnSync(npxBin, ['playwright', 'test', normalizedSpecPath], {
    stdio: 'inherit',
    cwd: ROOT_DIR
  });

  if (testResult.error) {
    fail(`Step 3 (Playwright run) could not be started: ${testResult.error.message}`);
  }

  return testResult.status === 0;
}

fetchJira();
const { relSpecPath } = generateTest();
const passed = runPlaywright(relSpecPath);

printHeader(`🎉 ALL-IN-ONE PIPELINE COMPLETED FOR \x1b[36m${key}\x1b[0m!`);
console.log(`📄 Testcase:  tests/testcases/TC-${key}.md`);
console.log(`🧪 Test Spec: ${relSpecPath}`);
console.log(passed
  ? `\x1b[32m✅ RESULT: Playwright test PASSED\x1b[0m`
  : `\x1b[31m❌ RESULT: Playwright test FAILED (see report above / npm run report)\x1b[0m`);
console.log(`======================================================\n`);

process.exit(passed ? 0 : 1);
